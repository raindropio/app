import browser from 'webextension-polyfill'
import config from '~config'

export async function openAdd(props) {
    const width = 420;
    const height = 600;
    const left = (screen.width/2)-(width/2);
    const top = (screen.height/2)-(height/2); 

    let path = 'index.html#'

    // /add route loaded from actual site because of bug of safari extension (local files doesn't have access)
    try{
        const { name } = await browser.runtime.getBrowserInfo()
        if (name.toLowerCase() == 'safari')
            path = config.links.app.index
    }catch(e) {}

    browser.windows.create({
        type: 'popup',
        url: `${path}/add?autoCreate=true&${new URLSearchParams(props).toString()}`,
        width,
        height,
        left,
        top
    })
}