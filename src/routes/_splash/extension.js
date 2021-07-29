import React from 'react'
import { useSelector } from 'react-redux'
import Fallback from './app'
import Screen from '~co/screen/basic'

export default function SplashExtension() {
    const isBrowserAction = location.search.includes('browser_action')
    const extensionMode = useSelector(state=>state.config.browser_extension_mode)

    console.log(isBrowserAction, extensionMode=='clipper')
    if (isBrowserAction && extensionMode=='clipper')
        return (
            <Screen safariExtensionBackdrop />
        )

    return <Fallback />
}