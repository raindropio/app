import s from './suggested.module.styl'
import React, { useMemo, useCallback } from 'react'
import t from '~t'
import { useSelector } from 'react-redux'
import { makeSuggestedFields } from '~data/selectors/bookmarks'
import { makeCollection } from '~data/selectors/collections'
import { isPro } from '~data/selectors/user'

import Button from '~co/common/button'
import CollectionIcon from '~co/collections/item/icon'

function Suggestion({ id, onClick }) {
    const getCollection = useMemo(()=>makeCollection(), [])
    const collection = useSelector(state=>getCollection(state, id))

    if (!collection.title)
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
            onClick={onClick}>
            {collection.cover?.[0] ? <CollectionIcon {...collection} /> : null}
            <span>{collection.title}</span>
        </Button>
    )
}

export default function BookmarkEditFormCollectionSuggested({ item, events: { onItemClick } }) {
    //get suggestions
    const enabled = useSelector(state=>state.config.ai_suggestions)
    const pro = useSelector(state=>isPro(state))
    const getSuggestedFields = useMemo(()=>makeSuggestedFields(), [])
    const { collections=[] } = useSelector(state=>getSuggestedFields(state, item))

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
            title={t.s('suggested')+' '+t.s('collection').toLowerCase()}>            
            {collections.map(id=>(
                <Suggestion 
                    key={id} 
                    id={id} 
                    onClick={onSuggestionClick} />
            ))}
        </div>
    )
}