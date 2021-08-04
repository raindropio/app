import browser from './browser'
import { currentTab } from './currentTab'
import { captureTab as fallbackCaptureTab } from '../fallback'
import { resize, parseDataURI } from '~modules/format/file'
import { normalizeURL } from '~modules/format/url'

export async function captureTab(link) {
    const { url } = await currentTab()

    if (normalizeURL(url) == normalizeURL(link))
        try{
            await browser.runtime.sendMessage(null, { type: 'CAPTURE_TAB_START' })

            //doesn't work in firefox, because it requires <all_urls> permissions
            const dataURI = await browser.tabs.captureVisibleTab(null, { format: 'jpeg', quality: 100 })

            await browser.runtime.sendMessage(null, { type: 'CAPTURE_TAB_END' })

            return resize(
                parseDataURI(dataURI), 
                { width: 640, format: 'jpeg', quality: 90 }
            )
        } catch(e) {console.log(e)}

    return fallbackCaptureTab(link)
}