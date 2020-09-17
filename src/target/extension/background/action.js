import browser from 'webextension-polyfill'
import { has } from './links'

async function updateBadge() {
    const [ { url } ] = await browser.tabs.query({ active: true })
    if (!url) return
    
    await Promise.all([
        browser.browserAction.setBadgeBackgroundColor({color: '#0087EA'}),
        browser.browserAction.setBadgeText({text: has(url) ? '✓' : ''}),

        ...(typeof browser.browserAction.setBadgeTextColor == 'function' ? [
            browser.browserAction.setBadgeTextColor({color: '#FFFFFF'})
        ] : []),
    ])
}

async function onTabsUpdated(id,{ status }) {
    if (status == 'complete')
        await updateBadge()
}

export default async function() {
    browser.tabs.onUpdated.removeListener(onTabsUpdated)
    browser.tabs.onUpdated.addListener(onTabsUpdated)

    browser.tabs.onActivated.removeListener(updateBadge)
    browser.tabs.onActivated.addListener(updateBadge)

    document.removeEventListener('LINKS_CHANGED', updateBadge)
    document.addEventListener('LINKS_CHANGED', updateBadge)
}