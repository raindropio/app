import browser from './browser'
import { captureTab as fallbackCaptureTab } from '../fallback'
import { dataURItoFile } from '~modules/format/file'

export async function captureTab(url) {
    try{
        const { id } = await browser.tabs.query({ url })

        //doesn't work in firefox, because it requires <all_urls> permissions
        const dataURI = await browser.tabs.captureVisibleTab(id, {
            format: 'jpeg',
            quality: 90
        })

        return dataURItoFile(dataURI)
    } catch(e) {console.log(e)}

    return fallbackCaptureTab(url)
}