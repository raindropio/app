import browser from './browser'

export async function currentTab() {
    const [ tab ] = await browser.tabs.query({ active: true, currentWindow: true })

    return tab || {} //{title, url}
}