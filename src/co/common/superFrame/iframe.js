import React, { useEffect } from 'react'
import { PREVIEW_URL } from '~data/constants/app'

export default function Iframe({ src, onError, ...etc }) {
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
            {...etc}
            src={`${PREVIEW_URL}/web/${btoa(src)}`}
            onError={onError} />
    )
}