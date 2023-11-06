import browser from 'webextension-polyfill'
import { environment } from '~target'

//safari have problems with cookies in extension pages
const base = environment.includes('safari') ? 
    'https://app.raindrop.io' : 
    '/index.html#'

export async function open(path, { width = 420, height = 600 } = {}) {
    let origin = { left: 0, top: 0, width: 0, height: 0 }
    try{
        origin = await browser.windows.getCurrent()
    } catch(_) {}

    return await browser.windows.create({
        url: `${base}${path}`,
        type: 'popup',

        //position
        width,
        height,
        left: parseInt(origin.left + (origin.width/2) - (width/2)),
        top: parseInt(origin.top + (origin.height/2) - (height/2))
    })
}

export default function() {
}