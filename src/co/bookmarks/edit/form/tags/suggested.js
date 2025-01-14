import s from './suggested.module.styl'
import React, { useState, useMemo, useCallback } from 'react'
import t from '~t'
import { useSelector } from 'react-redux'
import { makeSuggestedFields } from '~data/selectors/bookmarks'
import { isPro } from '~data/selectors/user'

import Icon from '~co/common/icon'
import Button from '~co/common/button'

function Suggestion({ tag, isNew=false, onClick }) {
    return (
        <Button 
            data-tag={tag}
            className={s.suggestion}
            variant='dotted'
            data-shape='pill'
            data-is-new={isNew}
            size='small'
            tabIndex='-1'
            onClick={onClick}>
            {isNew?<Icon name='add' size='micro' />:null}{tag}
        </Button>
    )
}

export default function BookmarkEditFormTagsSuggested({ item, onTagClick }) {
    //get suggestions
    const enabled = useSelector(state=>state.config.ai_suggestions)
    const pro = useSelector(state=>isPro(state))
    const getSuggestedFields = useMemo(()=>makeSuggestedFields(), [])
    const { tags, new_tags } = useSelector(state=>getSuggestedFields(state, item))

    //expand
    const [expanded, setExpanded] = useState(false)
    const onMouseOver = useCallback(()=>setExpanded(true), [])

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
            data-expanded={expanded}
            title={t.s('suggested')+' '+t.s('tags').toLowerCase()}
            onMouseOver={onMouseOver}>            
            {tags.map(tag=>(
                <Suggestion 
                    key={tag} 
                    tag={tag} 
                    onClick={onSuggestionClick} />
            ))}
            {new_tags.map(tag=>(
                <Suggestion 
                    key={tag} 
                    tag={tag}
                    isNew={true}
                    onClick={onSuggestionClick} />
            ))}
        </div>
    )
}