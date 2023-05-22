import s from './suggested.module.styl'
import React, { useMemo, useEffect, useCallback } from 'react'
import t from '~t'
import { useSelector, useDispatch } from 'react-redux'
import { suggestFields } from '~data/actions/bookmarks'
import { makeSuggestedFields } from '~data/selectors/bookmarks'
import { makeCollection } from '~data/selectors/collections'

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
            variant='outline'
            size='small'
            tabIndex='-1'
            onClick={onClick}>
            <CollectionIcon {...collection} />
            <span>{collection.title}</span>
        </Button>
    )
}

export default function BookmarkEditFormCollectionSuggested({ item, events: { onItemClick } }) {
    const dispatch = useDispatch()

    //get suggestions
    const getSuggestedFields = useMemo(()=>makeSuggestedFields(), [])
    const { collections=[] } = useSelector(state=>getSuggestedFields(state, item))

    //load suggestions
    useEffect(()=>dispatch(suggestFields(item)), [item.link])

    //click
    const onSuggestionClick = useCallback(e=>{
        const _id = parseInt(e.currentTarget.getAttribute('data-id'))
        onItemClick({ _id })
    }, [onItemClick])

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