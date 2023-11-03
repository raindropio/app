import browser from 'webextension-polyfill'
import { environment } from '~target'

//safari have problems with cookies in extension pages
const base = environment.includes('safari') ? 
    'https://app.raindrop.io' : 
    '/index.html#'
const winIds = new Set()

export async function open(path, { width = 420, height = 600, autoClose = true } = {}) {
    let origin = { left: 0, top: 0, width: 0, height: 0 }
    try{
        origin = await browser.windows.getCurrent()
    } catch(_) {}

    const { id } = await browser.windows.create({
        url: `${base}${path}`,
        type: 'popup',

        //position
        width,
        height,
        left: parseInt(origin.left + (origin.width/2) - (width/2)),
        top: parseInt(origin.top + (origin.height/2) - (height/2))
    })
    
    //delay autoclose on blur, otherwise buggy on arch linux
    if (autoClose)
        setTimeout(() => { winIds.add(id) }, 100)
}

/* Close all open popups when focused window change */
function onFocusChanged(id) {
    for(const close of winIds)
        if (close != id) {
            try { browser.windows.remove(close) } catch(e) {}
            winIds.delete(close)
        }
}

export default function() {
    browser.windows.onFocusChanged.removeListener(onFocusChanged)
    browser.windows.onFocusChanged.addListener(onFocusChanged)
}