import React, { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { target, environment } from '~target'
import Bookmarks from '~co/bookmarks'

export default function PageMySpaceBookmarks({ cId, search, itemId }) {
    const { pathname } = useLocation()
    let { raindrops_click } = useSelector(state=>state.config)
    const navigate = useNavigate()

    const onBookmarkClick = useCallback(item=>{
        //no preview in extension, so open in new tab instead
        if (target == 'extension' && raindrops_click=='preview')
            raindrops_click = 'new_tab'

        switch (raindrops_click) {
            case 'current_tab':
                return false

            case 'new_tab':
                window.open(item.link)
                if (target == 'extension' && !environment.includes('sidepanel'))
                    window.close()
                return true

            default:
                navigate(`item/${item._id}`)
                return true
        }
    }, [navigate, raindrops_click])

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