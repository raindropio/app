import React, { useState, useEffect } from 'react'
import iframeable from '~data/modules/format/iframeable_url'

export default function Iframe({ src, onError, ...etc }) {
    const [loadSrc, setLoadSrc] = useState('')

    useEffect(()=>{
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