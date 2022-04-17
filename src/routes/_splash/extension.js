import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import localStorage from '~modules/localStorage'
import Fallback from './fallback'
import Screen from '~co/screen/basic'

let _cachedMode = localStorage.getItem('_extension_mode_cached')
let _cachedHeight = localStorage.getItem('_extension_height_cached')

function _saveCachedHeight() {
    window.requestAnimationFrame(()=>
        localStorage.setItem('_extension_height_cached', window.innerHeight)
    )
}
window.onhashchange = _saveCachedHeight
window.onbeforeunload = _saveCachedHeight

export default function SplashExtension() {
    const isBrowserAction = location.search.includes('browser_action')
    const rehydrated = useSelector(state=>state._persist.rehydrated)
    const mode = useSelector(state=>rehydrated ? state.config.browser_extension_mode : _cachedMode)

    //persist
    useEffect(()=>{
        if (rehydrated && mode)
            window.requestAnimationFrame(()=>localStorage.setItem('_extension_mode_cached', mode))
    }, [rehydrated, mode])
    
    if (!isBrowserAction || mode=='clipper')
        return (
            <Screen style={{height: `${_cachedHeight||0}px`}} />
        )

    return <Fallback />
}