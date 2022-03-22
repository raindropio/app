import s from './browser.module.styl'
import React, { useEffect } from 'react'
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

    return (
        <iframe
            sandbox={`${process.env.APP_TARGET!='extension'?'allow-scripts':''} allow-popups allow-modals`}
            plugins='true'
            allowFullScreen
            loading='eager'
            {...etc}
            ref={forwardedRef}
            className={s.iframe + ' ' + className}
            src={`${PREVIEW_URL}/web/${btoa(src)}`}
            onError={onError} />
    )
}