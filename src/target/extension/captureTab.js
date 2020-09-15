import browser from './browser'
import { currentTab } from './currentTab'
import { captureTab as fallbackCaptureTab } from '../fallback'
import { dataUriToFile } from '~modules/format/url'

export async function captureTab(link) {
    const { url } = await currentTab()

    if (url == link)
        try{
            const dataURI = await browser.tabs.captureVisibleTab(null, { format: 'jpeg', quality: 90 })
            return dataUriToFile(dataURI)
        } catch(e) {}

    return fallbackCaptureTab(link)
}