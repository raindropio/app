import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import t from '~t'
import _ from 'lodash-es'
import { useDispatch, useSelector } from 'react-redux'
import { makeCollectionPath } from '~data/selectors/collections'
import { load } from '~data/actions/collections'

import { Label } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import CollectionIcon from '~co/collections/item/icon'
import Picker from '~co/collections/picker'
import Suggested from './suggested'

export default function BookmarkEditFormCollection({ item, onChange, onCommit }) {
    const dispatch = useDispatch()

    const [pick, setPick] = useState(false)

    //path
    useEffect(()=>dispatch(load()), [])
    const getCollectionPath = useMemo(()=>makeCollectionPath(), [])
    const path = useSelector(state=>getCollectionPath(state, item.collectionId, { self: true }))
    const pathText = useMemo(()=>path.map((p)=>p.title).join(' / '), [path])

    //button
    const buttonRef = useRef(null)

    const onPickerClick = useCallback((e)=>{
        e.preventDefault()
        setPick(true)
    }, [setPick])

    const onPickerClose = useCallback(()=>{
        setPick(false)
        buttonRef.current.focus()
    }, [buttonRef, setPick])

    const pickerEvents = useMemo(()=>({
        onItemClick: ({ _id })=>{
            onChange({ collectionId: _id })
            onCommit()
            onPickerClose()
        }
    }), [onChange, onCommit, onPickerClose])

    return (
        <>
            <Label>{t.s('collection')}</Label>

            <div>
                <Button 
                    ref={buttonRef}
                    href=''
                    variant='flat'
                    onClick={onPickerClick}
                    title={pathText}>
                    <CollectionIcon {...(_.last(path)||{})} />
                    <span>{pathText || t.s('selectCollection')+'…'}</span>
                    <Icon name='arrow' />
                </Button>

                {item?.collectionId == -1 ? (
                    <Suggested 
                        item={item}
                        onChange={onChange}
                        onCommit={onCommit} />
                ) : null}
            </div>

            {pick && (
                <Picker 
                    activeId={item.collectionId}
                    events={pickerEvents}
                    onClose={onPickerClose} />
            )}
        </>
    )
}