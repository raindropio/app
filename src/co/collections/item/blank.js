import s from './view.module.styl'
import React, { useState, useCallback } from 'react'
import t from '~t'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeBlank, createFromBlank } from '~data/actions/collections'

import { Error } from '~co/overlay/dialog'
import { Item, ItemTitle } from '~co/common/list'
import CollectionIcon from './icon'
import { Text } from '~co/common/form'

export default function CollectionsItemBlank({ _id, level, to, events: { onItemClick } }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)

    const cancel = useCallback(()=>dispatch(removeBlank()), [])

    const create = useCallback(()=>{
        //cancel
        if (!title.trim())
            return cancel()

        //create collection
        setLoading(loading=>{
            if (loading)
                return loading

            dispatch(
                createFromBlank({ title }, (newItem)=>{
                    if (onItemClick)
                        onItemClick(newItem)
                    else
                        navigate(to.replace(_id, newItem._id))
                }, e=>{
                    Error(e)
                    cancel()
                })
            )
            
            return true
        })
    }, [title, navigate, _id])

    const onKeyUp = useCallback((e)=>{
        switch(e.keyCode) {
            case 27: return cancel()
        }
    }, [])

    const onChange = useCallback((e)=>setTitle(e.target.value), [])

    const onSubmit = useCallback((e)=>{
        e.preventDefault()
        e.stopPropagation()
        create()
    }, [create])

    return (
        <form onSubmit={onSubmit}>
            <Item
                active={true}
                className={s.item}
                style={{'--level': level}}>
                <div className={s.expand} />
                
                <CollectionIcon 
                    _id={_id}
                    loading={loading} />

                <ItemTitle>
                    <Text
                        type='text'
                        variant='less'
                        required
                        autoFocus
                        disabled={loading}
                        value={title}
                        placeholder={t.s('collectionNew')}
                        onKeyUp={onKeyUp}
                        onChange={onChange}
                        onBlur={create} />
                </ItemTitle>
            </Item>
        </form>
    )
}