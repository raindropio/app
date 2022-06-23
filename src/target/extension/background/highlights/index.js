import browser from 'webextension-polyfill'
import { currentTab } from '~target'
import { load, add, update, remove, addSelection, enable } from './logic'

//Received messages from page
async function onMessage({ type, payload }, sender) {
    if (sender.id != browser.runtime.id || !sender.tab || typeof type != 'string') return

    switch(type) {
        case 'RDH_READY': break

        case 'RDH_ADD':
            try {
                await add(sender.tab, payload)
            } catch(e) {
                alert(`Error saving highlight!\n${String(e)}`)
            }
        break

        case 'RDH_UPDATE':
            try {
                await update(sender.tab, payload._id, payload)
            } catch(e) {
                alert(`Error updating highlight!\n${String(e)}`)
            }
        break

        case 'RDH_REMOVE':
            try {
                await remove(sender.tab, payload._id)
            } catch(e) {
                alert(`Error removing highlight!\n${String(e)}`)
            }
        break
    }
}

//Reload highlights when tab url change
async function onTabActivated({ tabId }) {
    if (!tabId) return
    const tab = await browser.tabs.get(tabId)
    if (!tab.url || !tab.active) return

    switch(tab.status) {
        case 'complete':
            await load(tab)
            break
    }
}

async function onTabsUpdated(id) {
    return onTabActivated({ tabId: id })
}

//Reload when bookmarks or permissions change
async function reloadAll() {
    const { id } = await currentTab()
    return onTabActivated({ tabId: id })
}

//public methods
export async function addCurrentTabSelection() {
    if (!await enable()) return
    return addSelection(await currentTab())
}

//default
export default function() {
    //connection to injected script
    browser.runtime.onMessage.removeListener(onMessage)
    browser.runtime.onMessage.addListener(onMessage)

    //current tab changed
    browser.tabs.onActivated.removeListener(onTabActivated)
    browser.tabs.onActivated.addListener(onTabActivated)
    browser.tabs.onUpdated.removeListener(onTabsUpdated)
    browser.tabs.onUpdated.addListener(onTabsUpdated)

    //permissions changed
    browser.permissions.onAdded.removeListener(reloadAll)
    browser.permissions.onAdded.addListener(reloadAll)

    //DO NOT LISTEN FOR `LINKS_CHANGED` event!
}