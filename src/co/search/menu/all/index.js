import s from './index.module.styl'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { makeCollection } from '~data/selectors/collections'
import t from '~t'

import Tabs from '~co/common/tabs'

export default function SearchMenuAll({ spaceId, all, setAll }) {
    const getCollection = useMemo(()=>makeCollection(), [])
    const collection = useSelector(state=>getCollection(state, spaceId))

    const items = useMemo(()=>([
        {key: true, title: t.s('everywhere')},
        {key: false, title: t.s('only') + ' ' + t.s('in') + ' ' + collection.title},
    ]), [collection.title])

    if (!parseInt(spaceId))
        return null

    return (
        <Tabs 
            className={s.tabs}
            items={items}
            active={all}
            onChange={(val)=>setAll(JSON.parse(val))} /> 
    )
}