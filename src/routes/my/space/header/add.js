import React, { useCallback, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeCollection } from '~data/selectors/collections'
import { manyCreate, manyReparseInplace } from '~data/actions/bookmarks'
import { extractURLs } from '~modules/format/url'
import { Error } from '~co/overlay/dialog'
import Add from '~co/bookmarks/add'

export default function PageMySpaceHeaderAdd({ cId, search }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getCollection = useMemo(makeCollection, [])
    const { access } = useSelector(state=>getCollection(state, cId))

    const onEdit = useCallback(([item])=>{
        navigate(`/my/${cId == 0 ? cId : item.collectionId}/item/${item._id}/edit`)
    }, [cId])

    const canAdd = cId != -99 && access?.level >= 3

    //paste link(s) outside of inputs to save into current collection
    useEffect(()=>{
        if (!canAdd) return

        const onPaste = e=>{
            if (e.target.closest?.('input, textarea, [contenteditable]')) return

            const urls = extractURLs(e.clipboardData?.getData('text'))
            if (urls.length)
                dispatch(manyCreate(
                    urls.map(link=>({ link, collectionId: parseInt(cId)||-1 })),
                    items=>dispatch(manyReparseInplace(items)),
                    Error
                ))
        }

        document.addEventListener('paste', onPaste)
        return ()=>document.removeEventListener('paste', onPaste)
    }, [canAdd, cId, dispatch])

    if (!canAdd)
        return null

    return (
        <Add 
            autoFocus={true}
            spaceId={cId}
            search={search}
            onEdit={onEdit} />
    )
}