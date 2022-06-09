import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { load } from '~data/actions/backups'

import Item from './item'

export default function SettingsBackupsFiles() {
    const dispatch = useDispatch()
    useEffect(()=>{ dispatch(load()) }, [])
    const { items } = useSelector(state=>state.backups)

    return items.map(item=>(
        <Item
            {...item}
            key={item._id} />
    ))
}