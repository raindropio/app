import browser from './browser'

export async function openTab(links) {
    for(const url of Array.isArray(links)?links:[links])
        await browser.tabs.create({ url, active: false })
}