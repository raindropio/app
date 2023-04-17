import React, { useCallback } from 'react'
import t from '~t'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function BookmarkEditFormImportant({ item: { important }, onChange, onSave }) {
    const onToggle = useCallback(e=>{
        e.preventDefault()
        onChange({ important: !important })
        onSave()
    }, [important])

    return (
        <Button 
            onClick={onToggle} 
            title={t.s('favorites')}
            variant={important ? 'primary' : 'outline'}>
            <Icon name={important ? 'like_active' : 'like_outline'} />
        </Button>
    )
}