import React, { useState, useEffect } from 'react'
import { API_ENDPOINT_URL } from '~data/constants/app'
import iframeable from '~data/modules/format/iframeable_url'

export default function Iframe({ src, onError, ...etc }) {
    const [loadSrc, setLoadSrc] = useState('')

    useEffect(()=>{
        //link to file? preview is allowed so no need to check iframeable
        if (src.includes(API_ENDPOINT_URL)) {
            setLoadSrc(src)
            return
        }

        iframeable(src)
            .then(result=>{
                if (result)
                    setLoadSrc(src.replace(/^http:\/\//, 'https://'))
                else
                    onError()
            })
    }, [src])

    return <iframe {...etc} src={loadSrc} />
}