import browser from 'webextension-polyfill'
import { currentTab } from '~target'
import { sync, add, update, remove, addSelection, requestPermission } from './logic'

async function onMessage({ type, payload }, sender) {
    if (sender.id != browser.runtime.id) return

    const tab = sender.tab || await currentTab()

    //RDH_READY is ignored on purpose: every injection is followed by push() with config
    switch(type) {
        case 'BOOKMARKS_CHANGED':
            await sync(tab)
        break

        case 'RDH_ADD':
        case 'RDH_UPDATE':
        case 'RDH_REMOVE':
            try {
                if (type == 'RDH_ADD')
                    await add(tab, payload)
                else if (type == 'RDH_UPDATE')
                    await update(tab, payload)
                else
                    await remove(tab, payload._id)
            } catch(e) {
                console.error(e)
                await sync(tab) //revert page to real state
            }
        break
    }
}

async function onTabActivated({ tabId }) {
    if (!tabId) return

    const tab = await browser.tabs.get(tabId)

    if (!tab || !tab.url || !tab.active || tab.status != 'complete')
        return

    await sync(tab)
}

async function onTabUpdated(tabId, changeInfo={}) {
    //full load or spa navigation, title/favicon/etc. is noise
    if (changeInfo.status == 'complete' || changeInfo.url)
        await onTabActivated({ tabId })
}

async function onPermissionsAdded() {
    const { id } = await currentTab()
    if (id)
        await onTabActivated({ tabId: id })
}

export async function addCurrentTabSelection() {
    if (await requestPermission())
        return addSelection(await currentTab())
}

export default function() {
    browser.runtime.onMessage.removeListener(onMessage)
    browser.runtime.onMessage.addListener(onMessage)

    browser.tabs.onActivated.removeListener(onTabActivated)
    browser.tabs.onActivated.addListener(onTabActivated)
    browser.tabs.onUpdated.removeListener(onTabUpdated)
    browser.tabs.onUpdated.addListener(onTabUpdated)

    browser.permissions.onAdded.removeListener(onPermissionsAdded)
    browser.permissions.onAdded.addListener(onPermissionsAdded)
}
