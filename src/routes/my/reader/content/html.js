import s from './html.module.styl'
import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { PREVIEW_URL } from '~data/constants/app'

import Preloader from '~co/common/preloader'

export default function ReaderHTML({ item: { type, link } }) {
    const { font_color, font_family, font_size } = useSelector(state=>state.config)
    const theme = useSelector(state=>state.local.theme)

    const [loading, setLoading] = useState(true)
    const onLoad = useCallback(()=>{ setLoading(false) }, [setLoading])

    let content = null
    switch(type) {
        case 'article':
            content = (
                <iframe 
                    role='article'
                    className={s.article}
                    loading='eager'
                    referrerpolicy='no-referrer'
                    src={PREVIEW_URL+'/article/'+btoa(link)+`#solid-bg=false&theme=${font_color||theme.app}&font-family=${font_family}&font-size=${font_size}`}
                    onLoad={onLoad} />
            )
            break

        default:
            content = (
                <iframe 
                    role='article'
                    className={s.embed}
                    allowFullScreen
                    loading='eager'
                    src={PREVIEW_URL+'/embed/'+btoa(link)}
                    onLoad={onLoad} />
            )
            break
    }

    return (
        <>
            {content}
            {loading && (
                <div className={s.preloader}>
                    <Preloader enlarge='1.5' />
                </div>
            )}
        </>
    )
}