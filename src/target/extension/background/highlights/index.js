import browser from 'webextension-polyfill'
import { currentTab } from '~target'
import { reset, reload, add, update, remove, addSelection, enable } from './logic'

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
async function onTabsUpdated(id, { status }) {
    if (typeof id == 'number' && 
        status == 'complete')
        await reload(await browser.tabs.get(id))
}

//Reload when bookmarks change
async function linksChanged() {
    return reload(await currentTab())
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
    browser.tabs.onUpdated.removeListener(onTabsUpdated)
    browser.tabs.onUpdated.addListener(onTabsUpdated)

    browser.tabs.onActivated.removeListener(reload)
    browser.tabs.onActivated.addListener(reload)

    //links are changed
    document.removeEventListener('LINKS_CHANGED', linksChanged)
    document.addEventListener('LINKS_CHANGED', linksChanged)
}