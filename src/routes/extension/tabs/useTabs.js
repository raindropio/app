import { useState, useEffect } from 'react'
import browser from '~target/extension/browser'
import { Error } from '~co/overlay/dialog'

export default function useTabs() {
    const [tabs, setTabs] = useState([])

    useEffect(()=>{
        async function get() {
            await browser.permissions.request({ permissions: ['tabs'] })
            return browser.tabs.query({ currentWindow: true })
        }

        get().then(setTabs).catch(Error)
    }, [])

    return [tabs, setTabs]
}