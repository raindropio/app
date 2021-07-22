import { useState, useEffect } from 'react'
import browser from '~target/extension/browser'
import { Error } from '~co/overlay/dialog'
import { permissions } from '~target/extension'

//faster load of current tab
let cache = []
async function get() {
    if (!await permissions.contains('tabs')) return []
    const tabs = await browser.tabs.query({ currentWindow: true })
    return cache = tabs.filter(({url})=>/^https?/i.test(url))
}

get()
//-----

export default function useTabs() {
    const [tabs, setTabs] = useState(cache)

    useEffect(()=>{
        permissions.request('tabs')
            .then(get)
            .then(setTabs).catch(Error)
    }, [])

    return [tabs, setTabs]
}