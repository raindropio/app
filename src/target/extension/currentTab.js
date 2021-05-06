import browser from './browser'

export async function currentTab() {
    //speed up for first run
    if (window._preloadedTab){
        const tab = {...window._preloadedTab}
        window._preloadedTab = undefined
        return tab
    }

    const [ tab ] = await browser.tabs.query({ active: true, currentWindow: true })

    return tab || {} //{title, url}
}