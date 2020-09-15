import browser from './browser'

export async function openLink(links) {
    for(const url of Array.isArray(links)?links:[links])
        await browser.tabs.create({ url, active: false })
}