import React, { useState, useEffect, useCallback } from 'react'
import { currentTab, getMeta } from '~target'
import browser from '~target/extension/browser'

import Button from './button'
import Permission from './permission'

export default function BookmarksAddExtensionTab(props) {
    const [loading, setLoading] = useState(false)
    const [tab, setTab] = useState({})

    //current tab
    const reload = useCallback(async()=>{
        setLoading(true)

        const tab = await currentTab()
        const { url, title } = tab
        const meta = await getMeta(tab)

        setLoading(false)
        setTab({
            link: url,
            title,
            ...meta
        })
    }, [])

    //reload on change active tab
    useEffect(()=>{
        reload()

        function onTabUpdated(id, { status }) {
            if (status == 'complete')
                reload()
        }

        browser.tabs.onUpdated.addListener(onTabUpdated)
        browser.tabs.onActivated.addListener(reload)

        return ()=>{
            browser.tabs.onUpdated.removeListener(onTabUpdated)
            browser.tabs.onActivated.removeListener(reload)
        }
    }, [])

    //can't get tab due to permission
    if (!loading &&
        !tab.link)
        return <Permission reload={reload} />

    return (
        <Button
            {...props}
            tab={tab} />
    )
}