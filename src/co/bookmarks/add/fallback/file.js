import React, { useCallback } from 'react'
import t from '~t'
import { useDispatch } from 'react-redux'
import { oneUpload } from '~data/actions/bookmarks'

import { MenuItem } from '~co/overlay/popover'
import Icon from '~co/common/icon'
import PickerFile from '~co/picker/file/element'

export default function BookmarksAddFallbackFile({ spaceId, onEdit }) {
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
        <MenuItem as='label'>
            <PickerFile onFile={onFile}>
                <Icon name='upload' />
                {t.s('upload')} {t.s('file').toLowerCase()}…
            </PickerFile>
        </MenuItem>
    )
}