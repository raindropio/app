import browser from 'webextension-polyfill'
import { permissions, getMeta } from '~target'
import * as links from '../links'
import inject from './highlight.js?asis'
import Api from '~data/modules/api'

let state = new Map() //<url:highlights>
let user = {}

async function send(tab, type, payload) {
    //inject highlights script
    const [injected] = await browser.tabs.executeScript(tab.id, { code: 'window.__hi' })
    if (!injected) {
        await browser.tabs.executeScript(tab.id, { code: 'window.__hi = true' })
        await browser.tabs.executeScript(tab.id, { file: inject, runAt: 'document_start' })
    }

    return browser.tabs.sendMessage(tab.id, { type, payload })
}

//Reset state
export function reset() {
    state.clear()
}

export function unset(tab) {
    state.delete(tab.url)
}

//Is highlights available?
export async function available() {
    //load user
    if (!user._id) {
        const load = await Api._get('user')
        user = load.user || {}
    }

    return user._id && permissions.contains('tabs')
}

//Make all required preparations before using
export async function enable() {
    if (!await permissions.request('tabs')) {
        alert('Permission required!')
        return false
    }
    return true
}

//Apply highlights for current tab
export async function apply(tab, highlights=[]) {
    if (state.has(tab.url) || highlights.length)
        state.set(tab.url, highlights)

    await send(tab, 'RDH_CONFIG', {
        enabled: true,
        nav: true,
        pro: user.pro
    })

    await send(tab, 'RDH_APPLY', highlights)
}

//Load highlights for tab
export async function load(tab) {
    if (!tab) return
    if (!await available()) return

    if (links.has(tab.url)) {
        let item = state.get(tab.url)
        if (!item) {
            const r = await Api._get(`raindrop/${links.getId(tab.url)}`)
            item = r.item || {}
            await apply(tab, item.highlights)
        }
    } else {
        await apply(tab, [])
    }
}

//Add highlight
export async function add(tab, newOne) {
    //local update
    await apply(tab, [...(state.get(tab.url)||[]), newOne])

    //reload links if no url in cache, very important
    if (!links.has(tab.url))
        await links.reload(true)

    //server apply
    let item = {}

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

        //add to links cache
        links.add(tab.url, item._id)
    }

    await apply(tab, item.highlights)
}

//Update highlight
export async function update(tab, highlightId, changed) {
    if (!highlightId) return
    if (!state.has(tab.url)) return

    //get highlight index
    const index = state.get(tab.url).findIndex(h=>h._id == highlightId)
    if (index == -1) return

    //local update
    let highlights = state.get(tab.url)
    highlights[index] = { ...highlights[index], ...changed }
    await apply(tab, highlights)

    //server apply
    const { item={} } = await Api._put(`raindrop/${links.getId(tab.url)}`, {
        highlights: [highlights[index]]
    }, {
        keepalive: true
    })
    await apply(tab, item.highlights)
}

//Remove highlight
export async function remove(tab, highlightId) {
    if (!highlightId) return
    if (!state.has(tab.url)) return

    //local update
    await apply(tab, (state.get(tab.url)||[]).filter(h=>h._id != highlightId))

    //server apply
    const { item={} } = await Api._put(`raindrop/${links.getId(tab.url)}`, {
        highlights: [{
            _id: highlightId,
            text: ''
        }]
    }, {
        keepalive: true
    })
    await apply(tab, item.highlights)
}

//Save highlight of current selection of current tab
export async function addSelection(tab) {
    return send(tab, 'RDH_ADD_SELECTION')
}