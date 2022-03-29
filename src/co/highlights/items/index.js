import s from './index.module.styl'
import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { highlights as getHighlights } from '~data/selectors/bookmarks'
import { isPro } from '~data/selectors/user'
import { oneLoad } from '~data/actions/bookmarks'

import useScrollToNew from './useScrollToNew'
import Item from '../item'

export default function HighlightsItems({ _id, webViewRef }) {
    const containerRef = useRef(null)
    const dispatch = useDispatch()
    const highlights = useSelector(state=>getHighlights(state, _id))
    const pro = useSelector(state=>isPro(state))

    //load highlights
    useEffect(()=>{dispatch(oneLoad(_id))}, [_id])

    useScrollToNew(containerRef, highlights)

    return (
        <section 
            ref={containerRef}
            className={s.highlights}>
            {highlights.map((item, i)=>
                <Item
                    {...item}
                    bookmarkId={_id}
                    webViewRef={webViewRef}
                    pro={pro}
                    key={item._id || i} />
            )}
        </section>
    )
}