import browser from 'webextension-polyfill'
import { environment } from '~target'
import * as links from '../links'
import * as action from '../action'
import file from './highlight.js?asis'
import Api from '~data/modules/api'

//server state → page
export async function sync(tab) {
    if (!isWebPage(tab)) return
    if (!await havePermission()) return

    await links.load()

    let highlights = []

    if (links.has(tab.url))
        try {
            const { item={} } = await Api._get(`raindrop/${links.getId(tab.url)}`)
            highlights = item.highlights || []
        } catch(e) {
            console.error(e)
        }

    if (
        highlights.length ||
        environment.includes('safari-ios') || //always active there
        await isInjected(tab) //reset what page shows otherwise
    )
        await push(tab, highlights)
}

//page changes → server → verified state back to page
export async function add(tab, highlight) {
    let item

    const id = await findId(tab.url)
    if (id)
        try {
            const updated = await Api._put(`raindrop/${id}`, {
                highlights: [highlight]
            }, {
                keepalive: true
            })
            item = updated.item
        } catch(e) {
            if (e.status != 404) throw e
        }

    if (!item) {
        const created = await Api._post('raindrop', {
            link: tab.url,
            title: tab.title,
            highlights: [highlight],
            pleaseParse: { weight: 1 }
        }, {
            keepalive: true
        })
        item = created.item

        links.add(tab.url, item._id)
        action.updateBadge().catch(console.error)
    }

    await push(tab, item.highlights)
}

export async function update(tab, highlight) {
    const id = await findId(tab.url)
    if (!id) throw new Error('no bookmark for tab url')

    //server merges into existing highlights by _id
    const { item } = await Api._put(`raindrop/${id}`, {
        highlights: [highlight]
    }, {
        keepalive: true
    })

    await push(tab, item.highlights)
}

export async function remove(tab, highlightId) {
    const id = await findId(tab.url)
    if (!id) throw new Error('no bookmark for tab url')

    //empty text removes it
    const { item } = await Api._put(`raindrop/${id}`, {
        highlights: [{
            _id: highlightId,
            text: ''
        }]
    }, {
        keepalive: true
    })

    await push(tab, item.highlights)
}

export async function addSelection(tab) {
    if (!await inject(tab)) return
    return browser.tabs.sendMessage(tab.id, { type: 'RDH_ADD_SELECTION' })
}

export async function havePermission() {
    return browser.permissions.contains({
        permissions: ['tabs'],
        origins: ['*://*/*']
    })
}

export async function requestPermission() {
    if (await havePermission())
        return true

    await browser.tabs.create({
        url: '/index.html#/extension/highlights'
    })

    return false
}

//bookmark can be created elsewhere and be missing in local cache
async function findId(url) {
    await links.load()

    if (links.has(url))
        return links.getId(url)

    const { ids=[] } = await Api._get(`import/url/exists?url=${encodeURIComponent(url)}`)
    if (ids.length) {
        links.add(url, ids[0])
        return ids[0]
    }
}

async function push(tab, highlights) {
    const config = await getConfig()
    if (!config) return //logged out

    if (!await inject(tab)) return

    await browser.tabs.sendMessage(tab.id, { type: 'RDH_CONFIG', payload: config })
    await browser.tabs.sendMessage(tab.id, { type: 'RDH_APPLY', payload: highlights })
}

async function getConfig() {
    try {
        const { user } = await Api._get('user')
        if (user?._id)
            return {
                enabled: true,
                nav: true,
                pro: user.pro ? true : false
            }
    } catch(e) {
        console.error(e)
    }
    return null
}

async function inject(tab) {
    if (!isWebPage(tab)) return false

    if (await isInjected(tab))
        return true

    await browser.scripting.executeScript({
        target: { tabId: tab.id },
        func: function() { window.__hi = true },
        injectImmediately: true
    })
    await browser.scripting.executeScript({
        target: { tabId: tab.id },
        files: [file],
        injectImmediately: true
    })

    return true
}

//page keeps the mark even when extension context restarts
async function isInjected(tab) {
    if (!await browser.permissions.contains({
        permissions: ['scripting'],
        origins: [tab.url]
    }))
        return false

    const [res] = await browser.scripting.executeScript({
        target: { tabId: tab.id },
        func: function() { return window.__hi },
        injectImmediately: true
    })
    return res?.result ? true : false
}

function isWebPage(tab) {
    return /^https?:/.test(tab?.url || '')
}