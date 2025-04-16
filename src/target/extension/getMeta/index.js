import browser from '../browser'
import { currentTab } from '../currentTab'
import parse from './parse?asis'

export async function getMeta(tab) {
    const { id, url: link, title } = tab || await currentTab()

    try{
        if (browser.scripting) {
            const [res] = await browser.scripting.executeScript({
                target: { tabId: id },
                files: [parse],
                injectImmediately: true
            })
            if (res?.result && res?.result?.link)
                return res.result
        }
    } catch (e) {
        console.log(e)
    }

    //fallback if meta fail
    return { link, title }
}