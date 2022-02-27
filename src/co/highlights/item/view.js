import s from './view.module.styl'
import t from '~t'
import React, { useState, useCallback } from 'react'
import Text from '../text'
import { Text as Note } from '~co/common/form'
import { ShortDate } from '~modules/format/date'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Color from './color'

export default function HighlightsItemView({ text, color, created, onChange, onRemove, ...etc }) {
    const [note, setNote] = useState(()=>etc.note)
    const onChangeNote = useCallback(e=>setNote(e.target.value), [])
    const onSubmitNote = useCallback(e=>{
        e.preventDefault()
        onChange({ note })
    }, [note, onChange])

    return (
        <form 
            onSubmit={onSubmitNote} 
            className={s.item}>
            <Text 
                className={s.text}
                color={color}>
                {text}
            </Text>

            <div className={s.footer}>
                <Note 
                    className={s.note}
                    type='text'
                    variant='inline'
                    autoSize
                    autoComplete='off'
                    spellCheck='false'
                    placeholder={`${t.s('add')} ${t.s('note').toLowerCase()}…`}
                    value={note}
                    onChange={onChangeNote}
                    onBlur={onSubmitNote} />

                <div className={s.buttons}>
                    <Color 
                        color={color}
                        onChange={onChange} />

                    <Button 
                        variant='link'
                        accent='danger'
                        title={`${t.s('remove')} ${t.s('highlights').toLowerCase()}`}
                        onClick={onRemove}>
                        <Icon name='trash' />
                    </Button>

                    <div className={s.created}>
                        <ShortDate date={created} />
                    </div>
                </div>
            </div>
        </form>
    )
}