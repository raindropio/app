import { useState, useEffect } from 'react'
import browser from '~target/extension/browser'
import { Error } from '~co/overlay/dialog'

let cache = []
async function preload() {
    if (!await browser.permissions.contains({ permissions: ['tabs'] }))
        return []
        
    const tabs = await browser.tabs.query({ currentWindow: true })
    return cache = tabs.filter(({url})=>/^https?/i.test(url))
}

export { preload }

export default function useTabs() {
    const [tabs, setTabs] = useState(cache)

    useEffect(()=>{
        browser.permissions.request({ permissions: ['tabs'] })
            .then(preload)
            .then(setTabs).catch(Error)
    }, [])

    return [tabs, setTabs]
}