import s from './view.module.styl'
import t from '~t'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { target } from '~target'

import Text from '../text'
import { Text as Note } from '~co/common/form'
import { ShortDate } from '~modules/format/date'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import ProCheck from '~co/user/pro/check'
import Color from './color'

export default function HighlightsItemView({ text, color, created, pro, onScrollIntoView, onChange, onRemove, ...etc }) {
    const noteRef = useRef(null)

    const [note, setNote] = useState(()=>etc.note)
    useEffect(()=>setNote(etc.note), [etc.note])

    const onChangeNote = useCallback(e=>setNote(e.target.value), [])
    const onSubmitNote = useCallback(e=>{
        e.preventDefault()
        onChange({ note })
    }, [note, onChange])
    const onClickNote = useCallback(e=>{
        if (pro) return
        e.preventDefault()
        ProCheck('annotations')
    }, [pro])

    const onFormMouseDown = useCallback(e=>{
        if (noteRef.current)
            if (e.target == e.currentTarget || e.target == noteRef.current)
                setTimeout(() => noteRef.current?.focus())
    }, [noteRef])

    return (
        <form 
            onSubmit={onSubmitNote} 
            onMouseDown={onFormMouseDown}
            onMouseLeave={target == 'extension' ? onSubmitNote : undefined}
            className={s.item}>
            <Text 
                className={s.text}
                color={color}
                data-clickable={typeof onScrollIntoView == 'function'}
                onClick={onScrollIntoView}>
                {text}
            </Text>

            <div className={s.footer}>
                <div 
                    className={s.noteWrap}
                    onClick={onClickNote}>
                    <Note 
                        ref={noteRef}
                        className={s.note}
                        type='text'
                        variant='inline'
                        autoSize
                        autoComplete='off'
                        spellCheck='false'
                        disabled={!pro}
                        placeholder={`${t.s('add')} ${t.s('note').toLowerCase()}…`}
                        value={note}
                        onChange={onChangeNote}
                        onBlur={onSubmitNote} />
                </div>

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