import React from 'react'
import { useSelector } from 'react-redux'
import Fallback from './app'
import Screen from '~co/screen/basic'

let _cachedMode = window.localStorage && window.localStorage.getItem('_extension_mode_cached')
let _cachedHeight = window.localStorage && window.localStorage.getItem('_extension_height_cached')

window.onhashchange = function() {
    if (!window.localStorage) return
    window.localStorage.setItem('_extension_height_cached', window.innerHeight)
}

export default function SplashExtension() {
    const isBrowserAction = location.search.includes('browser_action')
    const rehydrated = useSelector(state=>state.config._rehydrated)
    const mode = useSelector(state=>rehydrated ? state.config.browser_extension_mode : _cachedMode)

    //persist
    if (rehydrated && mode && window.localStorage)
        window.localStorage.setItem('_extension_mode_cached', mode)

    if (!isBrowserAction || mode=='clipper')
        return (
            <Screen 
                safariExtensionBackdrop
                style={{height: `${_cachedHeight||0}px`}} />
        )

    return <Fallback />
}