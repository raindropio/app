import s from './index.module.styl'
import React, { useMemo } from 'react'
import t from '~t'
import { useSelector } from 'react-redux'
import { makeDraftStatus } from '~data/selectors/bookmarks'

import { Helmet } from 'react-helmet'
import { Title } from '~co/common/header'

export default ({ item })=>{
    const getDraftStatus = useMemo(()=>makeDraftStatus(), [])
    const status = useSelector(state=>getDraftStatus(state, item.link))

    let title = ''

    switch(status) {
        case 'new':     title = t.s('newBookmark'); break
        case 'idle':    title = ''; break
        case 'loading': title = ''; break
        default:        title = t.s('bookmark')+' '+t.s('saved').toLowerCase(); break
    }

    return (
        <>
            <Helmet><title>{title}</title></Helmet>

            <Title className={s.title}>
                {title}
            </Title>
        </>
    )
}