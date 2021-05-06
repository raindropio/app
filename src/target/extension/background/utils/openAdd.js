import browser from 'webextension-polyfill'
import config from '~config'
import { getMeta } from '~target'

export async function openAdd(props) {
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

    //get meta if save of current tab
    const meta = await getMeta({ url: props.link })

    //params
    const params = {
        ...props,
        ...(meta && meta.link == props.link ? meta : {})
    }

    for(const i in params)
        switch(typeof params[i]){
            case 'object': params[i] = JSON.stringify(params[i]); break
        }

    browser.windows.create({
        type: 'popup',
        url: `${path}/add?${new URLSearchParams(params).toString()}`,
        width,
        height,
        left,
        top
    })
}