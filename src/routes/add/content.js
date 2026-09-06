import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Bookmark from '~co/bookmarks/edit'
import { getDraftStatus } from '~data/selectors/bookmarks'

export default function AddContent({ item }) {
    const add_auto_save_context_menu = useSelector(state=>state.config.add_auto_save_context_menu)
    const status = useSelector(state=>getDraftStatus(state, item.link))
    const wasNew = useRef(false)

    useEffect(()=>{
        if (status == 'new')
            wasNew.current = true
        else if (wasNew.current && add_auto_save_context_menu && status == 'loaded')
            window.close()
    }, [status, add_auto_save_context_menu])

    return (
        <Bookmark
            _id={item.link}

            new={{ item, autoCreate: true }}

            autoFocus='title'
            autoWindowClose />
    )
}