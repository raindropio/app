import s from './index.module.styl'
import React, { useRef, useCallback } from 'react'
import t from '~t'
import { useSelector, useDispatch } from 'react-redux'
import { bookmarksIds, makeStatus, getSearchEmpty } from '~data/selectors/bookmarks'
import { nextPage } from '~data/actions/bookmarks'

import { Link } from 'react-router-dom'
import Button from '~co/common/button'

function BookmarksFooter({ spaceId, compact, compactLimit, getLink }) {
    //data
    const count = useSelector(state=>bookmarksIds(state, spaceId).length)
    const getStatus = useRef(makeStatus()).current
    const status = useSelector(state=>getStatus(state, spaceId))
    const isSearching = useSelector(state=>!getSearchEmpty(state, spaceId))

    //actions
    const dispatch = useDispatch()

    const loadMore = useCallback(e=>{
        e && e.preventDefault()
        dispatch(nextPage(spaceId))
    }, [spaceId])

    let content = null

    switch(status.nextPage) {
        case 'loading':
            content = (
                <div className={s.loading}>{t.s('loading')}&hellip;</div>
            )
            break

        case 'error':
            content = (
                <span>
                    {t.s('server')} <a href='' onClick={loadMore}>{t.s('tryAgain')}</a>
                </span>
            )
            break

        case 'noMore':
            if (count)
                content = `${count} ${t.s('bookmarks')} ${isSearching ? t.s('found').toLowerCase() : ''}`
            break

        default:
            if (status.main == 'loaded')
                content = (
                    <Button 
                        data-block
                        variant='outline' 
                        onClick={loadMore}>
                        {t.s('more')}&hellip;
                    </Button>
                )
            break
    }

    if ((compact && status.main == 'loaded' && status.nextPage != 'noMore') ||
        (compact && count > compactLimit))
        content = (
            <Button 
                as={Link}
                variant='flat'
                data-block
                to={getLink({ _id:spaceId, full:true, refine:'' })}>
                {t.s('showAll')}
            </Button>
        )

    if (!content) return null

    return (
        <div 
            className={s.footer}
            data-compact={compact}>
            {content}
        </div>
    )
}

BookmarksFooter.defaultProps = {
    spaceId:        0,
    compact:        false,
    compactLimit:   0, //useful when compact is true, means that full items count more that showed right now
    getLink:        undefined
}

export default BookmarksFooter