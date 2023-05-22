import t from '~t'
import React, { useState, useEffect, useCallback } from 'react'
import browser from '~target/extension/browser'
import { environment } from '~target'
import links from '~config/links'

import { Layout } from '~co/common/form'
import Alert from '~co/common/alert'
import Button from '~co/common/button'

export function usePermissionsGranted() {
    const [granted, setGranted] = useState(true)

    useEffect(()=>{
        async function load() {
            setGranted(
                await browser.permissions.contains({ origins: ['*://*/*'] })
            )
        }
        
        load()
        browser.permissions.onAdded.removeListener(load)
        browser.permissions.onAdded.addListener(load)
    }, [setGranted])

    return granted
}

export default function ExtensionHighlightsPermissions() {
    const requestPermission = useCallback((e)=>{
        e.preventDefault()
        browser.permissions.request({ origins: ['*://*/*'] })
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
    //macos
    else if (environment.includes('safari'))
        content = (
            <ol>
                <li>Open <b>Safari Settings</b></li>
                <li>Find <b>Raindrop.io</b> in <b>Extensions</b></li>
                <li>Click <b>Always Allow on Every Website</b></li>
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
            Additional permissions required to start using Highlights
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