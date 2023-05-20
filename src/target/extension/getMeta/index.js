import browser from '../browser'
import { currentTab } from '../currentTab'
import parse from './parse?asis'

export async function getMeta() {
    const { id, url: link, title } = await currentTab()

    try{
        if (browser.scripting) {
            const [{ result }] = await browser.scripting.executeScript({
                target: { tabId: id },
                files: [parse],
                injectImmediately: true
            })
            if (result && result.link)
                return result
        }
    } catch (e) {
        console.log(e)
    }

    //fallback if meta fail
    return { link, title }
}