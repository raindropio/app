import React, { useCallback } from 'react'
import t from '~t'

import { Label } from '~co/common/form'
import TagsField from '~co/tags/field'
import Suggested from './suggested'

export default function BookmarkEditFormTags({ autoFocus, item, onCommit, onChange, onSave }) {
    const onTagsFieldChange = useCallback((tags)=>onChange({ tags }), [onChange])
    const onSuggestionClick = useCallback((tag)=>{
        onChange({ tags: [...item.tags, tag] })
        onSave()
    }, [onChange, item.tags])

    return (
        <>
            <Label>{t.s('tags')}</Label>
            <div>
                <TagsField 
                    value={item.tags}
                    spaceId={item.collectionId}
                    
                    autoFocus={autoFocus=='tags'}
                    onChange={onTagsFieldChange}
                    onBlur={onCommit} />

                <Suggested 
                    item={item}
                    onTagClick={onSuggestionClick} />
            </div>
        </>
    )
}