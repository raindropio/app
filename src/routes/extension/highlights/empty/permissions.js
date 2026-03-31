import t from '~t'
import React, { useState, useEffect, useCallback } from 'react'
import browser from '~target/extension/browser'
import { environment } from '~target'
import links from '~config/links'

import { Layout } from '~co/common/form'
import Alert from '~co/common/alert'
import Button from '~co/common/button'

const required = {
    permissions: ['tabs'],
    origins: ['*://*/*']
}

export function usePermissionsGranted() {
    const [granted, setGranted] = useState(true)

    useEffect(()=>{
        async function load() {
            setGranted(
                await browser.permissions.contains(required)
            )
        }
        
        load()
        browser.permissions.onAdded.removeListener(load)
        browser.permissions.onAdded.addListener(load)
    }, [setGranted])

    return granted
}

export default function ExtensionHighlightsPermissions() {
    const requestPermission = useCallback(async(e)=>{
        e.preventDefault()
        await browser.permissions.request(required)
        await browser.tabs.reload()
        window.close()
    }, [])

    var content = null

    //ios
    if (environment.includes('safari-ios'))
        content = (
            <ol>
                <li>{t.s('highlightsPermissionIos1')}</li>
                <li>{t.s('highlightsPermissionIos2')}</li>
                <li>{t.s('highlightsPermissionIos3')}</li>
                <li>{t.s('highlightsPermissionIos4')}</li>
            </ol>
        )
    else
        content = (
            <Button
                onClick={requestPermission}
                variant='primary'>
                {t.s('continue')}
            </Button>
        )

    return (<Layout>
        <Alert variant='warning'>
            {t.s('highlightsPermissionPrivacy')}<br /><br />
            {t.s('highlightsPermissionAccess')}<br />
            {t.s('highlightsPermissionRevoke')}
        </Alert>

        {content}

        <Button
            href={links.help.highlights.addExtension}
            target='_blank'
            variant='link'>
            {t.s('help')}
        </Button>
    </Layout>)
}