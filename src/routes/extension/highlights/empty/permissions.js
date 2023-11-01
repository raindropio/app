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
                <li>Open iOS <b>Settings</b></li>
                <li>Go to <b>Safari</b> / <b>Extensions</b> / <b>Raindrop.io</b></li>
                <li>Tap <b>All Websites</b> or <b>Other Websites</b> and select <b>Allow</b></li>
                <li>Restart Safari</li>
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
            The Raindrop.io extension <b>respects your privacy</b> and functions without requiring any additional permissions.<br /><br />
            However, to <b>enable highlighting</b>, we need <b>access to the data of your visited webpages</b>.<br />
            Rest assured, you can easily revoke this permission at any time through the extension settings.
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