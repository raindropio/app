import s from './note.module.styl'
import t from '~t'
import React, { useCallback } from 'react'
import links from '~config/links'

import { Text, Label } from '~co/common/form'
import Icon from '~co/common/icon'
import Button from '~co/common/button'
import { Confirm } from '~co/overlay/dialog'

export default function BookmarkEditFormNote({ autoFocus, item: { note }, onCommit, onChange }) {    
    const onChangeField = useCallback(e=>
        onChange({ [e.target.getAttribute('name')]: e.target.value }),
        []
    )

    const onMarkdownClick = useCallback(e=>{
        e.preventDefault()
        Confirm(t.s('note'), {
            description: 'Styling with Markdown is supported',
            cancel: t.s('howToUse')
        }).then(ok=>{
            if (!ok)
                window.open(links.help['add-note'])
        })
    }, [])

    return (
        <>
            <Label>{t.s('note')}</Label>
            <Text 
                className={s.note}
                type='text'
                autoFocus={autoFocus=='note'}
                name='note'
                value={note}
                autoSize={true}
                multiline={true}
                minRows={3}
                onChange={onChangeField}
                onBlur={onCommit}>
                <Button 
                    className={s.button} 
                    onClick={onMarkdownClick}
                    size='small'
                    title='Stlying with Markdown is supported'>
                    <Icon name='markdown' />
                </Button>
            </Text>
        </>
    )
}