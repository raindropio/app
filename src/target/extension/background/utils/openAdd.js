import browser from 'webextension-polyfill'
import config from '~config'

export async function openAdd(props) {
    const width = 420;
    const height = 600;
    const left = (screen.width/2)-(width/2);
    const top = (screen.height/2)-(height/2); 

    const { name } = await browser.runtime.getBrowserInfo()

    // /add route loaded from actual site because of bug of safari extension (local files doesn't have access)
    browser.windows.create({
        type: 'popup',
        url: `${name.toLowerCase() == 'safari' ? config.links.app.add : 'index.html#/add'}?autoCreate=true&${new URLSearchParams(props).toString()}`,
        width,
        height,
        left,
        top
    })
}