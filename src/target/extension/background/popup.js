import browser from 'webextension-polyfill'

//safari have problems with cookies in extension pages
const base = /apple/i.test(navigator.vendor) ? 
    'https://app.raindrop.io' : 
    '/index.html#'
const winIds = new Set()

export async function open(path) {
    const width = 420;
    const height = 600;

    let origin = { left: 0, top: 0, width: screen.width, height: screen.height }
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
    winIds.add(id)
}

/* Close all open popups when focused window change */
function onFocusChanged(id) {
    for(const close of winIds)
        if (close != id) {
            browser.windows.remove(close)
            winIds.delete(close)
        }
}

export default function() {
    browser.windows.onFocusChanged.removeListener(onFocusChanged)
    browser.windows.onFocusChanged.addListener(onFocusChanged)
}