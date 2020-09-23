import browser from 'webextension-polyfill'
import config from '~config'

export function openAdd(props) {
    const width = 420;
    const height = 600;
    const left = (screen.width/2)-(width/2);
    const top = (screen.height/2)-(height/2); 

    // /add route loaded from actual site because of bug of safari extension (local files doesn't have access)
    browser.windows.create({
        type: 'popup',
        url: `${config.links.app.add}?autoCreate=true&${new URLSearchParams(props).toString()}`,
        width,
        height,
        left,
        top
    })
}