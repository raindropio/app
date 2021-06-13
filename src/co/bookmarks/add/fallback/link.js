import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import t from '~t'
import links from '~config/links'
import { oneCreate } from '~data/actions/bookmarks'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import PickerLink from '~co/picker/link'

export default function BookmarksAddFallbackLink({ spaceId, onEdit, pin, onClose }) {
    const dispatch = useDispatch()

    const onLink = useCallback(link=>(
        new Promise((res, rej)=>{
            dispatch(
                oneCreate({
                    collectionId: spaceId,
                    link
                }, (item)=>{
                    onEdit && onEdit(item)
                    res(item)
                }, rej)
            )
        })
    ), [spaceId, onEdit])

    return (
        <PickerLink
            pin={pin}
            onClose={onClose}
            buttons={
                <Button 
                    href={links.help['add-bookmark']}
                    target='_blank'>
                    <Icon name='help' />
                    {t.s('help')}
                </Button>
            }
            onLink={onLink} />
    )
}