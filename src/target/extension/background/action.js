import browser from 'webextension-polyfill'
import { has } from './links'
import { currentTab } from '~target'

let icon = unescape('%u2713') //✓, glitchy without escape in safari

export async function updateBadge() {
    const { url, id: tabId } = await currentTab()
    if (!url) return
    
    await Promise.all([
        browser.action.setBadgeBackgroundColor({tabId, color: '#0087EA'}),
        browser.action.setBadgeText({tabId, text: has(url) ? icon : ''}),

        ...(typeof browser.action.setBadgeTextColor == 'function' ? [
            browser.action.setBadgeTextColor({tabId, color: '#FFFFFF'})
        ] : []),
    ])
}

async function onTabsUpdated(id, details = {}) {
    if (details?.status == 'complete')
        await updateBadge()
}

export default function() {
    browser.tabs.onUpdated.removeListener(onTabsUpdated)
    browser.tabs.onUpdated.addListener(onTabsUpdated)

    browser.tabs.onActivated.removeListener(updateBadge)
    browser.tabs.onActivated.addListener(updateBadge)
}