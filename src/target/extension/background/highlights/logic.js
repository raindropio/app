import browser from 'webextension-polyfill'
import { permissions } from '~target'
import * as links from '../links'
import Api from '~data/modules/api'

let state = new Map() //<url:highlights>
let user = {}

async function send(tab, type, payload) {
    return browser.tabs.sendMessage(tab.id, { type, payload })
}

//Reset state
export function reset() {
    state.clear()
}

//Is highlights available?
export async function available() {
    //load user
    if (!user._id) {
        const load = await Api._get('user')
        user = load.user || {}
    }

    return user._id && permissions.contains('tabs', true)
}

//Make all required preparations before using
export async function enable() {
    if (!permissions.request('tabs')) {
        alert('Permission required!')
        return false
    }
    return true
}

//Apply highlights for current tab
export async function apply(tab, highlights=[]) {
    state.set(tab.url, highlights)

    await send(tab, 'RDH_CONFIG', {
        enabled: highlights.length ? true : false,
        nav: true,
        pro: user.pro
    })

    await send(tab, 'RDH_APPLY', highlights)
}

//Load highlights for current tab
export async function reload(tab) {
    if (!await available()) return
    if (!links.has(tab.url)) return

    const { item={} } = await Api._get(`raindrop/${links.getId(tab.url)}`)
    await apply(tab, item.highlights)
}

//Add highlight
export async function add(tab, newOne) {
    //local update
    await apply(tab, [...(state.get(tab.url)||[]), newOne])

    //server apply
    const { ids: [id] } = await Api._get(`import/url/exists?url=${encodeURIComponent(tab.url)}`)

    let item = {}

    //existing bookmark
    if (id) {
        const updated = await Api._put(`raindrop/${id}`, {
            highlights: [newOne]
        })
        item = updated.item
    }
    //new bookmark
    else {
        const parse = await Api._get(`import/url/parse?url=${encodeURIComponent(tab.url)}`)
        const created = await Api._post('raindrop', {
            ...(parse.item || {}),
            link: tab.url,
            highlights: [newOne]
        })
        item = created.item
    }
    
    //reload links cache, other update/delete methods rely on it
    if (!links.has(tab.url))
        await links.reload(true)

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
    })
    await apply(tab, item.highlights)
}

//Save highlight of current selection of current tab
export async function addSelection(tab) {
    return send(tab, 'RDH_ADD_SELECTION')
}