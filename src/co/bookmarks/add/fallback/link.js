import React, { useCallback, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import t from '~t'
import links from '~config/links'
import { oneCreate } from '~data/actions/bookmarks'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import PickerLink from '~co/picker/link'

export default function BookmarksAddFallbackLink({ spaceId, autoFocus, onEdit }) {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const button = useRef(null)

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
        <>
            <Button 
                ref={button}
                variant='primary'
                title={t.s('addBookmark')}
                autoFocus={autoFocus}
                onClick={()=>setShow(true)}>
                <Icon name='new_bookmark' />
                {t.s('add')}
            </Button>

            {show && (
                <PickerLink
                    pin={button}
                    onClose={()=>setShow(false)}
                    buttons={
                        <Button 
                            href={links.help['add-bookmark']}
                            target='_blank'>
                            <Icon name='help' />
                            {t.s('help')}
                        </Button>
                    }
                    onLink={onLink} />
            )}
        </>
    )
}