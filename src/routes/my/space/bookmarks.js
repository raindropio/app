import React, { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import Bookmarks from '~co/bookmarks'

export default function PageMySpaceBookmarks({ cId, search, itemId }) {
    const { pathname } = useLocation()
    const { raindrops_click } = useSelector(state=>state.config)
    const navigate = useNavigate()

    const onBookmarkClick = useCallback(item=>{
        switch (raindrops_click) {
            case 'current_tab':
                return false

            case 'new_tab':
                window.open(item.link)
                return true

            default:
                navigate(`item/${item._id}`)
                return true
        }
    }, [navigate])

    const events = useMemo(()=>({
        onBookmarkClick
    }), [onBookmarkClick])

    return (
        <Bookmarks 
            spaceId={cId}
            search={search}
            full={search || pathname.includes('/full') ? true : false}
            activeId={itemId && parseInt(itemId)}
            events={events} />
    )
}