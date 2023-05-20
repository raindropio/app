import browser from 'webextension-polyfill'
import { currentTab } from '~target'
import { load, add, update, remove, addSelection, requestPermission } from './logic'

//Received messages from page
async function onMessage({ type, payload }, sender) {
    if (sender.id != browser.runtime.id) return

    const tab = sender.tab || await currentTab()

    switch(type) {
        case 'RDH_READY':
        case 'BOOKMARKS_CHANGED':
            await load(tab)
        break

        case 'RDH_ADD':
            try {
                await add(tab, payload)
            } catch(e) {
                alert(`Error saving highlight!\n${String(e)}`)
            }
        break

        case 'RDH_UPDATE':
            try {
                await update(tab, payload._id, payload)
            } catch(e) {
                alert(`Error updating highlight!\n${String(e)}`)
            }
        break

        case 'RDH_REMOVE':
            try {
                await remove(tab, payload._id)
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
    
    if (!tab || !tab.url || !tab.active || tab.status != 'complete')
        return

    await load(tab)
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
    if (await requestPermission())
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
}