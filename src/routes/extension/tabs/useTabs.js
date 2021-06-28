import { useState, useEffect } from 'react'
import browser from '~target/extension/browser'
import { Error } from '~co/overlay/dialog'

export default function useTabs() {
    const [tabs, setTabs] = useState([])

    useEffect(()=>{
        async function get() {
            await browser.permissions.request({ permissions: ['tabs'] })
            const tabs = await browser.tabs.query({ currentWindow: true })

            return tabs.filter(({url})=>/^https?/i.test(url))
        }

        get().then(setTabs).catch(Error)
    }, [])

    return [tabs, setTabs]
}