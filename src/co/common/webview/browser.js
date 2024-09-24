import s from './browser.module.styl'
import React, { useEffect, useMemo } from 'react'
import { PREVIEW_URL } from '~data/constants/app'

export default function WebViewBrowser({ src, forwardedRef, className='', onError, ...etc }) {
    useEffect(()=>{
        function onMessage(e) {
            if (e.data == 'preview-error')
                onError()
        }
        window.addEventListener('message', onMessage)
        return ()=>window.removeEventListener('message', onMessage)
    }, [onError])

    const base64 = useMemo(()=>
        btoa(
            String.fromCharCode(...new TextEncoder('utf-8').encode(src))
        ),
        [src]
    )

    return (
        <iframe
            plugins='true'
            allow='fullscreen; clipboard-write'
            loading='eager'
            {...etc}
            ref={forwardedRef}
            className={s.iframe + ' ' + className}
            src={`${PREVIEW_URL}/web/${base64}`}
            onError={onError} />
    )
}