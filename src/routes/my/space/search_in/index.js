import s from './index.module.styl'
import React, { useMemo, useCallback } from 'react'
import _ from 'lodash-es'
import t from '~t'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { makeCollection } from '~data/selectors/collections'

import Tabs from '~co/common/tabs'

export default function MyMainSearchIn({ cId, search, fromCid }) {
    const navigate = useNavigate()

    //collection
    const getCollection = useMemo(makeCollection, [])
    const collection = useSelector(state=>
        getCollection(state, parseInt(cId) || fromCid),
    )

    //tabs
    const tabs = useMemo(()=>[
        {key: 0, title: `${t.s('defaultCollection-0')} ${t.s('everywhere').toLowerCase()}`},
        {key: collection._id, title: `${_.capitalize(t.s('in'))} "${collection.title}"`}
    ], [collection])

    const onChange = useCallback(_id=>{
        navigate(`../../${_id}/${encodeURIComponent(search)}/${collection._id}`)
    }, [navigate, search, collection._id])
    
    if (!search || !collection._id)
        return null

    return (
        <div className={s.tabs}>
            <Tabs
                selectOnSmallScreen={false}
                items={tabs}
                active={parseInt(cId)}
                onChange={onChange} />
        </div>
    )
}