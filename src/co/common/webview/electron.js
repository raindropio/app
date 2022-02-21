import s from './electron.module.styl'
import React, { useEffect, useState } from 'react'

export function isElectron() {
	return ('plugins' in document.createElement('webview'))
}

export default function WebViewElectron({ forwardedRef, className='', onLoad, onError, ...etc }) {
    const [started, setStarted] = useState(false) //prevent white flash

    useEffect(()=>{
        function didStartLoading() {
            setStarted(true)
        }
        function didFailLoad() {
            setTimeout(onError, 100)
        }

        if (forwardedRef.current) {
            forwardedRef.current.addEventListener('did-start-loading', didStartLoading)
            forwardedRef.current.addEventListener('dom-ready', onLoad)
            forwardedRef.current.addEventListener('did-fail-load', didFailLoad)
        }

        return ()=>{
            if (!forwardedRef.current) return
            forwardedRef.current.removeEventListener('did-start-loading', didStartLoading)
            forwardedRef.current.removeEventListener('dom-ready', onLoad)
            forwardedRef.current.removeEventListener('did-fail-load', didFailLoad)
        }
    }, [forwardedRef, setStarted, onLoad, onError])

    return (
        <webview 
            allowpopups='true'
            plugins='true'
            {...etc}
            className={s.webview + ' ' + className}
            data-started={started}
            ref={forwardedRef} />
    )
}