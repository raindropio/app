import s from './scroll.module.styl'
import _ from 'lodash-es'
import React, { useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { nextPage } from '~data/actions/bookmarks'

export default function BookmarksContainerScroll({ spaceId, children }) {
    const div = useRef(null)
    const dispatch = useDispatch()

    const loadNextPage = useCallback(
        _.throttle(()=>{
            if (!div.current) return
            if (div.current.scrollTop < div.current.scrollHeight - div.current.offsetHeight*3)
                return
            dispatch(nextPage(spaceId))
        }, 150),
        [div, spaceId]
    )

    return (
        <div 
            ref={div}
            className={s.scroll}
            onScroll={loadNextPage}>
            {children}
        </div>
    )
}