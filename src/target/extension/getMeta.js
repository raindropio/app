import browser from './browser'
import { currentTab } from './currentTab'

//arguments optional, by default get for current tab
export async function getMeta(options={}) {
    let { url, id } = options

    try{
        if (!id){
            const tab = await currentTab()
            id = tab.id

            if (url && tab.url != url)
                return {}
        }

        const meta = await browser.tabs.sendMessage(id, { type: 'GET_META' })
        return meta || {}
    } catch (e) {
        console.log(e)
        return {}
    }
}