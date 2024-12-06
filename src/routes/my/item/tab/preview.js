import s from './preview.module.styl'
import React, { useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { API_ENDPOINT_URL } from '~data/constants/app'

import useWithWebView from '~co/highlights/useWithWebView'
import Preloader from '~co/common/webview/preloader'

function getPreviewLink(_id) {
    return `${API_ENDPOINT_URL}raindrop/preview/${_id}`
}

export function PreloadPreviewLink({ item }) {
    if (item.type != 'link')
        return <link rel='prefetch' crossOrigin='use-credentials' href={getPreviewLink(item._id)} />
    return null
}

export default function PageMyItemTabPreview({ item: { _id }, webViewRef }) {
    //highlights
	useWithWebView(webViewRef, _id)

    //article style
    const { font_color, font_family, font_size } = useSelector(state=>state.config)
    const theme = useSelector(state=>state.local.theme)

    //loading state
    const [loading, setLoading] = useState(true)
    const onLoad = useCallback(()=>{ setLoading(false) }, [setLoading])
    useEffect(()=>{ setLoading(true) }, [_id])

    return (
        <>
            {loading && (
                <Preloader className={s.preloader} />
            )}
            
            <iframe 
                key={_id}
                ref={webViewRef}
                role='article'
                className={s.embed}
                allow='fullscreen; clipboard-write'
                loading='eager'
                referrerPolicy='no-referrer'
                src={`${getPreviewLink(_id)}#solid-bg=false&theme=${font_color||theme.app}&font-family=${font_family}&font-size=${font_size}`}
                onLoad={onLoad} />
        </>
    )
}