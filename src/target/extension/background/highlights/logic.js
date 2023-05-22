import browser from 'webextension-polyfill'
import { getMeta } from '~target'
import * as links from '../links'
import inject from './highlight.js?asis'
import Api from '~data/modules/api'

let user = {}

//Load highlights for tab
export async function load(tab) {
    if (!tab) return
    if (!await havePermission()) return

    let highlights = []

    if (links.has(tab.url)) {
        const id = links.getId(tab.url)
        try {
            const { item={} } = await Api._get(`raindrop/${id}`)
            highlights = item.highlights || []
        } catch(e) {
            console.error(e)
        }
    }

    //activate
    if (
        highlights.length || //when any highlights
        !browser.contextMenus || //always active for mobile
        await isInjected(tab) //or reset highlights if already injected
    )
        await apply(tab, highlights)
}

//Add highlight
export async function add(tab, newOne) {
    if (!tab) return
    let item = {}

    //reload links
    await links.reload(true)

    //existing bookmark
    if (links.has(tab.url)) {
        const updated = await Api._put(`raindrop/${links.getId(tab.url)}`, {
            highlights: [newOne]
        }, {
            keepalive: true
        })
        item = updated.item
    }
    //new bookmark
    else {
        const meta = await getMeta(tab)
        const created = await Api._post('raindrop', {
            link: tab.url,
            title: tab.title,
            ...meta,
            highlights: [newOne],
            pleaseParse: { weight: 1 }
        }, {
            keepalive: true
        })
        item = created.item

        //reload links
        await links.reload(true)
    }

    await apply(tab, item.highlights)
}

//Update highlight
export async function update(tab, highlightId, changed) {
    if (!tab) return
    if (!highlightId) return

    //reload links
    await links.reload(true)
    
    if (links.has(tab.url)) {
        //get item
        const { item: { highlights=[] } } = await Api._get(`raindrop/${links.getId(tab.url)}`)

        //get highlight index
        const index = highlights.findIndex(h=>h._id == highlightId)

        if (index != -1) {
            //local update
            highlights[index] = { ...highlights[index], ...changed }
            await apply(tab, highlights)

            //server apply
            await Api._put(`raindrop/${links.getId(tab.url)}`, {
                highlights: [highlights[index]]
            }, {
                keepalive: true
            })
        }
    }

    //reload highlights
    await load(tab)
}

//Remove highlight
export async function remove(tab, highlightId) {
    if (!tab) return
    if (!highlightId) return

    //reload links
    await links.reload(true)
    
    //server apply
    if (links.has(tab.url))
        await Api._put(`raindrop/${links.getId(tab.url)}`, {
            highlights: [{
                _id: highlightId,
                text: ''
            }]
        }, {
            keepalive: true
        })

    //reload highlights
    await load(tab)
}

//Save highlight of current selection of current tab
export async function addSelection(tab) {
    if (!tab) return
    return send(tab, 'RDH_ADD_SELECTION')
}





//inject and send message to highlights script on page
async function send(tab, type, payload) {
    if (!tab) return

    //inject highlights script
    const injected = await isInjected(tab)
    if (!injected) {
        await browser.scripting.executeScript({
            target: { tabId: tab.id },
            func: function() { window.__hi = true },
            injectImmediately: true
        })
        await browser.scripting.executeScript({
            target: { tabId: tab.id },
            files: [inject],
            injectImmediately: true
        })
    }

    return browser.tabs.sendMessage(tab.id, { type, payload })
}

//is injected
async function isInjected(tab) {
    const [res] = await browser.scripting.executeScript({
        target: { tabId: tab.id },
        func: function() { return window.__hi },
        injectImmediately: true
    })
    return res?.result ? true : false
}

//Do user granted permissions
export async function havePermission() {
    return browser.permissions.contains({
        origins: ['*://*/*']
    })
}

//Open special page to give permissions
export async function requestPermission() {
    if (await havePermission())
        return true

    await browser.tabs.create({
        url: '/index.html#/extension/highlights'
    })

    return false
}

//Apply highlights for current tab
export async function apply(tab, highlights=[]) {
    if (!tab) return

    //load user
    if (!user._id)
        try {
            const load = await Api._get('user')
            user = load.user || {}
        } catch(e) {
            console.error(e)
        }

    //not logged in
    if (!user._id)
        return

    await send(tab, 'RDH_CONFIG', {
        enabled: true,
        nav: true,
        pro: (user.pro ? true : false)
    })

    await send(tab, 'RDH_APPLY', highlights)
}