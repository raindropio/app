import { useState, useEffect } from 'react'
import browser from '~target/extension/browser'
import { Error } from '~co/overlay/dialog'

let cache = []
async function preload() {
    if (!await browser.permissions.contains({ permissions: ['tabs'] }))
        return []
        
    let tabs = await browser.tabs.query(
        (await browser.windows.getCurrent())?.type == 'popup' ?
            //in case runing in separate popup window
            { windowType: 'normal' } :
            //normal behaviour
            { currentWindow: true }
    )

    return cache = tabs.filter(({url, pinned})=>
        /^https?/i.test(url) && !pinned
    )
}

export { preload }

export default function useTabs() {
    const [tabs, setTabs] = useState(cache)

    useEffect(()=>{
        preload().then(setTabs)
    }, [])

    useEffect(()=>{
        browser.permissions.request({ permissions: ['tabs'] })
            .then(preload)
            .then(setTabs)
            .catch(e=>{
                if (e?.message != 'This function must be called during a user gesture')
                    Error(e)
            })
    }, [])

    return [tabs, setTabs]
}