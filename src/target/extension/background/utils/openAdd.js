import browser from 'webextension-polyfill'
import config from '~config'

export function openAdd(props) {
    const width = 420;
    const height = 600;
    const left = parseInt((screen.width/2)-(width/2));
    const top = parseInt((screen.height/2)-(height/2)); 

    let path = 'index.html#'

    // /add route loaded from actual site because of bug of safari extension (local files doesn't have access)
    try{
        if (browser.runtime.getURL('').includes('safari-web-extension'))
            path = config.links.app.index
    }catch(e) {}

    browser.windows.create({
        type: 'popup',
        url: `${path}/add?${new URLSearchParams(props).toString()}`,
        width,
        height,
        left,
        top
    })
}