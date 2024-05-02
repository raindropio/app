import s from './suggested.module.styl'
import React, { useMemo, useCallback } from 'react'
import t from '~t'
import { useSelector } from 'react-redux'
import { makeSuggestedFields } from '~data/selectors/bookmarks'
import { isPro } from '~data/selectors/user'

import Button from '~co/common/button'

function Suggestion({ tag, onClick }) {
    return (
        <Button 
            data-tag={tag}
            className={s.suggestion}
            variant='dotted'
            data-shape='pill'
            size='small'
            tabIndex='-1'
            onClick={onClick}>
            {tag}
        </Button>
    )
}

export default function BookmarkEditFormTagsSuggested({ item, onTagClick }) {
    //get suggestions
    const enabled = useSelector(state=>state.config.ai_suggestions)
    const pro = useSelector(state=>isPro(state))
    const getSuggestedFields = useMemo(()=>makeSuggestedFields(), [])
    const suggestions = useSelector(state=>getSuggestedFields(state, item))
    const tags = useMemo(()=>(suggestions.tags||[]).filter(tag=>!item.tags.includes(tag)), [suggestions.tags, item.tags])

    //click
    const onSuggestionClick = useCallback(e=>{
        const tag = e.currentTarget.getAttribute('data-tag')
        onTagClick(tag)
    }, [onTagClick])

    if (!enabled || !pro)
        return null

    return (
        <div 
            className={s.suggested}
            title={t.s('suggested')+' '+t.s('tags').toLowerCase()}>            
            {tags.map(tag=>(
                <Suggestion 
                    key={tag} 
                    tag={tag} 
                    onClick={onSuggestionClick} />
            ))}
        </div>
    )
}