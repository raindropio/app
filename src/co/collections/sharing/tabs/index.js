import React, { useMemo, useEffect } from 'react'
import t from '~t'
import { useDispatch, useSelector } from 'react-redux'
import { sharingLoad } from '~data/actions/collections'
import { makeCollection, getSharingCount } from '~data/selectors/collections'

import Header from '~co/common/header'
import Tabs from '~co/common/tabs'

export default function SharingTabs({ tab, setTab, _id }) {
    const dispatch = useDispatch()

    const getCollection = useMemo(()=>makeCollection())
    const collection = useSelector(state=>getCollection(state, _id))
    const sharingCount = useSelector(state=>getSharingCount(state, _id))

    useEffect(()=>{
        dispatch(sharingLoad(_id))
    }, [_id])

    const tabs = useMemo(()=>[
        { key: 'public', title: t.s('publicPage'), icon: collection.public ? 'check' : 'public' },
        { key: 'collaborators', title: t.s('sharing')+' '+(sharingCount ? ` (${sharingCount})` : ''), icon: sharingCount ? 'check' : 'sharing' }
    ], [collection, sharingCount])

    return (
        <Header style={{paddingTop:0}}>
            <Tabs 
                items={tabs}
                active={tab}
                onChange={setTab} />
        </Header>
    )
}