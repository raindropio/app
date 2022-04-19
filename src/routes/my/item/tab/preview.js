import s from './preview.module.styl'
import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { PREVIEW_URL } from '~data/constants/app'

import useWithWebView from '~co/highlights/useWithWebView'
import Preloader from '~co/common/preloader'

export default function PageMyItemTabPreview({ item: { _id, type, link }, webViewRef }) {
    //highlights
	useWithWebView(webViewRef, _id)

    //article style
    const { font_color, font_family, font_size } = useSelector(state=>state.config)
    const theme = useSelector(state=>state.local.theme)

    //loading state
    const [loading, setLoading] = useState(true)
    const onLoad = useCallback(()=>{ setLoading(false) }, [setLoading])

    //src
    let src = ''
    switch(type) {
        case 'article': src = PREVIEW_URL+'/article/'+btoa(link)+`#solid-bg=false&theme=${font_color||theme.app}&font-family=${font_family}&font-size=${font_size}`; break
        default:        src = PREVIEW_URL+'/embed/'+btoa(link); break
    }

    return (
        <>
            <iframe 
                ref={webViewRef}
                role='article'
                className={s.embed}
                allow='fullscreen; clipboard-write'
                loading='eager'
                referrerPolicy='no-referrer'
                src={src}
                onLoad={onLoad} />

            {loading && (
                <div className={s.preloader}>
                    <Preloader enlarge='1.5' />
                </div>
            )}
        </>
    )
}