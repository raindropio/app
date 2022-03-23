import browser from 'webextension-polyfill'
import { currentTab } from '~target'
import { reset, load, unset, add, update, remove, addSelection, enable } from './logic'

//Received messages from page
async function onMessage({ type, payload }, sender) {
    if (sender.id != browser.runtime.id || !sender.tab || typeof type != 'string') return

    switch(type) {
        case 'RDH_READY':
        break

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
    const tab = await browser.tabs.get(tabId)
    if (!tab.url || !tab.active) return

    switch(tab.status) {
        case 'complete':    await load(tab); break
        default:            unset(tab); break
    }
}

async function onTabsUpdated(id) {
    return onTabActivated({ tabId: id })
}

//Reload when bookmarks or permissions change
async function reloadAll() {
    reset()
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
    reset()

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

    //links are changed
    document.removeEventListener('LINKS_CHANGED', reloadAll)
    document.addEventListener('LINKS_CHANGED', reloadAll)
}