import React, { useCallback } from 'react'
import t from '~t'
import { useDispatch } from 'react-redux'
import { oneUpload } from '~data/actions/bookmarks'
import { Confirm } from '~co/overlay/dialog'
import links from '~config/links'

import { MenuItem } from '~co/overlay/popover'
import Icon from '~co/common/icon'
import PickerFile from '~co/picker/file/element'

export default function BookmarksAddFallbackFile({ spaceId, onEdit }) {
    const dispatch = useDispatch()

    const onFile = useCallback(async file=>{
        if (/\.(html|csv|json|enex)$/i.test(file.name)){
            const openImport = await Confirm(
                t.s('importConfirmTitle'),
                {
                    description: t.s('importConfirmDescription'),
                    ok: t.s('importBookmarks')+'…',
                }
            )
            
            if (openImport)
                window.open(links.app.import)
            return
        }

        await new Promise((res, rej)=>{
            dispatch(
                oneUpload({
                    collectionId: spaceId,
                    file
                }, (items)=>{
                    onEdit && onEdit(items)
                    res(items)
                }, rej)
            )
        })
    }, [spaceId, onEdit])

    return (
        <MenuItem as='label'>
            <PickerFile onFile={onFile}>
                <Icon name='upload' />
                {t.s('uploadFile')}
            </PickerFile>
        </MenuItem>
    )
}