import browser from '../browser'
import { currentTab } from '../currentTab'
import parse from './parse?raw'

export async function getMeta() {
    try{
        const [meta] = await browser.tabs.executeScript(null, {
            code: parse,
            runAt: 'document_start'
        })
        if (meta && meta.link)
            return meta
    } catch (e) {
        console.log(e)
    }

    //fallback if meta fail
    const { url: link, title } = await currentTab()
    return { link, title }
}