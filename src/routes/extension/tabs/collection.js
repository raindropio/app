import React, { useMemo, useState } from 'react'
import t from '~t'
import _ from 'lodash-es'
import { useSelector } from 'react-redux'
import { makeCollectionPath } from '~data/selectors/collections'

import { Label } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import CollectionIcon from '~co/collections/item/icon'
import Picker from '~co/collections/picker'

export default function AddTabsCollection({ collectionId, setCollectionId, loading }) {
    //path
    const getCollectionPath = useMemo(()=>makeCollectionPath(), [])
    const path = useSelector(state=>getCollectionPath(state, collectionId, { self: true }))
    const pathText = useMemo(()=>path.map((p)=>p.title).join(' / '), [path])

    //picker
    const [show, setShow] = useState(false)

    //events
    const events = useMemo(()=>({
        onItemClick: ({ _id })=>{
            setCollectionId(_id)
            setShow(false)
        }
    }), [setCollectionId])

    return (
        <>
            <Label>{t.s('collection')}</Label>

            <div>
                <Button 
                    disabled={loading}
                    href=''
                    variant='outline'
                    onClick={()=>setShow(true)}
                    title={pathText}>
                    <CollectionIcon 
                        {...(_.last(path)||{})} />
                    <span>{pathText || t.s('selectCollection')+'…'}</span>
                    <Icon name='arrow' />
                </Button>
            </div>

            {show && (
                <Picker 
                    activeId={collectionId}
                    events={events}
                    onClose={()=>setShow(false)} />
            )}
        </>
    )
}