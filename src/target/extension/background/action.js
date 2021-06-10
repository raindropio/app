import browser from 'webextension-polyfill'
import { has } from './links'
import { currentTab } from '~target'

let icon = '✓' //glitchy on safari
if (process.env.EXTENSION_VENDOR == 'safari')
    icon = ' '

async function updateBadge() {
    const { url, id: tabId } = await currentTab()
    if (!url) return
    
    await Promise.all([
        browser.browserAction.setBadgeBackgroundColor({tabId, color: '#0087EA'}),
        browser.browserAction.setBadgeText({tabId, text: has(url) ? icon : ''}),

        ...(typeof browser.browserAction.setBadgeTextColor == 'function' ? [
            browser.browserAction.setBadgeTextColor({tabId, color: '#FFFFFF'})
        ] : []),
    ])
}

async function onTabsUpdated(id,{ status }) {
    if (status == 'complete')
        await updateBadge()
}

export default function() {
    browser.tabs.onUpdated.removeListener(onTabsUpdated)
    browser.tabs.onUpdated.addListener(onTabsUpdated)

    browser.tabs.onActivated.removeListener(updateBadge)
    browser.tabs.onActivated.addListener(updateBadge)

    document.removeEventListener('LINKS_CHANGED', updateBadge)
    document.addEventListener('LINKS_CHANGED', updateBadge)
}