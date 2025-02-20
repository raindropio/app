import s from './suggested.module.styl'
import React, { useState, useMemo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { makeSuggestedFields } from '~data/selectors/bookmarks'
import { makeCollectionPath } from '~data/selectors/collections'
import { isPro } from '~data/selectors/user'

import Button from '~co/common/button'

const self = { self: true }

function Suggestion({ id, onClick }) {
    const getCollectionPath = useMemo(()=>makeCollectionPath(), [])
    const path = useSelector(state=>getCollectionPath(state, id, self))
    const shortPath = useMemo(()=>path.map((p)=>p.title).slice(-2).join(' / '), [path])
    const fullPath = useMemo(()=>path.map((p)=>p.title).join(' / '), [path])
    const collection = useMemo(()=>path?.[path.length-1], [path])

    if (!collection?.title)
        return null

    return (
        <Button
            data-id={id}
            className={s.suggestion}
            data-tint={collection.color}
            style={{'--tint': collection.color}}
            variant='dotted'
            data-shape='pill'
            size='small'
            tabIndex='-1'
            title={fullPath}
            onClick={onClick}>
            <div className={s.path}><span>{shortPath}</span></div>
        </Button>
    )
}

export default function BookmarkEditFormCollectionSuggested({ item, events: { onItemClick } }) {
    //get suggestions
    const enabled = useSelector(state=>state.config.ai_suggestions)
    const pro = useSelector(state=>isPro(state))
    const getSuggestedFields = useMemo(()=>makeSuggestedFields(), [])
    const { collections=[] } = useSelector(state=>getSuggestedFields(state, item))

    //expand
    const [expanded, setExpanded] = useState(false)
    const onMouseOver = useCallback(()=>setExpanded(true), [])

    //click
    const onSuggestionClick = useCallback(e=>{
        const _id = parseInt(e.currentTarget.getAttribute('data-id'))
        onItemClick({ _id })
    }, [onItemClick])

    if (!enabled || !pro)
        return null

    return (
        <div 
            className={s.suggested} 
            data-expanded={expanded}
            data-is-new={item.collectionId <= 0}
            onMouseOver={onMouseOver}>
            {collections.map(id=>(
                <Suggestion 
                    key={id} 
                    id={id} 
                    onClick={onSuggestionClick} />
            ))}
        </div>
    )
}