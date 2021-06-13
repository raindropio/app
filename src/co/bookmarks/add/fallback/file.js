import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { oneUpload } from '~data/actions/bookmarks'

import PickerFile from '~co/picker/file/popover'

export default function BookmarksAddFallbackFile({ spaceId, onEdit, pin, onClose }) {
    const dispatch = useDispatch()

    const onFile = useCallback(file=>(
        new Promise((res, rej)=>{
            dispatch(
                oneUpload({
                    collectionId: spaceId,
                    file
                }, (item)=>{
                    onEdit && onEdit(item)
                    res(item)
                }, rej)
            )
        })
    ), [spaceId, onEdit])

    return (
        <PickerFile
            pin={pin}
            onClose={onClose}
            onFile={onFile} />
    )
}