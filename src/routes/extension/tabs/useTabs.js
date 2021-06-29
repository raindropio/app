import { useState, useEffect } from 'react'
import browser from '~target/extension/browser'
import { Error } from '~co/overlay/dialog'

//faster load of current tab
let cache = []
async function get() {
    const tabs = await browser.tabs.query({ currentWindow: true })
    return cache = tabs.filter(({url})=>/^https?/i.test(url))
}
get()
//-----

export default function useTabs() {
    const [tabs, setTabs] = useState(cache)

    useEffect(()=>{
        browser.permissions.request({ permissions: ['tabs'] })
            .then(get)
            .then(setTabs).catch(Error)
    }, [])

    return [tabs, setTabs]
}