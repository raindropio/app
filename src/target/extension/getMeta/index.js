import browser from '../browser'
import { currentTab } from '../currentTab'
import parse from './parse?raw'

//arguments optional, by default get for current tab
export async function getMeta(options={}) {
    let { url, id=null } = options

    try{
        if (!id && url){
            const tab = await currentTab()
            id = tab.id

            if (tab.url != url)
                return {}
        }

        const [meta] = await browser.tabs.executeScript(id, {
            code: parse
        })
        return meta || {}
    } catch (e) {
        console.log(e)
        return {}
    }
}