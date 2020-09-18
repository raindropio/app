import browser from './browser'
import { currentTab } from './currentTab'
import { captureTab as fallbackCaptureTab } from '../fallback'
import { resize, parseDataURI } from '~modules/format/file'
import normalizeUri from 'normalize-url'

export async function captureTab(link) {
    const { url } = await currentTab()

    if (normalizeUri(url) == normalizeUri(link))
        try{
            //doesn't work in firefox, because it requires <all_urls> permissions
            const dataURI = await browser.tabs.captureVisibleTab(null, { format: 'jpeg', quality: 100 })

            return resize(
                parseDataURI(dataURI), 
                { width: 640, format: 'jpeg', quality: 90 }
            )
        } catch(e) {console.log(e)}

    return fallbackCaptureTab(link)
}