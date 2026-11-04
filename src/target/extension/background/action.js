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

async function openPopup(path) {
    if (!path)
        return browser.action.openPopup()

    const { default_popup } = browser.runtime.getManifest().action

    await browser.action.setPopup({ popup: `${default_popup}#${path}` })
    try {
        await browser.action.openPopup()
    } finally {
        //always restore, even if opening failed
        await browser.action.setPopup({ popup: default_popup })
    }
}

async function openWindow({ path = '', width = 420, height = 600 }) {
    const origin = await browser.windows.getCurrent()

    return browser.windows.create({
        url: `/index.html#${path}`,
        type: 'popup',
        width,
        height,
        left: Math.round(origin.left + (origin.width - width) / 2),
        top: Math.round(origin.top + (origin.height - height) / 2)
    })
}

//openPopup can fail in some browsers (e.g. Vivaldi), then a separate window is used with windowOptions
export async function open(path, windowOptions) {
    try {
        await openPopup(path)
    } catch (e) {
        console.log(e)
        await openWindow({ path, ...windowOptions })
    }
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