import s from './date_time.module.styl'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { format } from 'date-fns'
import parseISO from 'date-fns/parseISO'

export function DateTime({ className='', left, right, value, min, onChange, onFocus, onDoubleClick, ...etc }) {
    const convert = useCallback(date=>{
        try {
            return format(date instanceof Date ? date : parseISO(date), 'yyyy-MM-dd\'T\'HH:mm')
        } catch(e) {
            console.error(e)
            return undefined
        }
    }, [])

    const inputMin = useMemo(()=>convert(min), [min, convert])

    //value
    const [inputValue, setInputValue] = useState(convert(value))
    const onInputChange = useCallback(e=>setInputValue(e.currentTarget.value), [setInputValue])
    useEffect(()=>setInputValue(convert(value)), [value, setInputValue])
    useEffect(()=>{ if (inputValue) { onChange(new Date(inputValue)) } }, [inputValue, onChange])

    //focus
    const onInputFocus = useCallback(e=>{
        e.currentTarget.showPicker()
        if (typeof onFocus == 'function')
            onFocus(e)
    }, [onFocus])

    //double click
    const onInputDoubleClick = useCallback(e=>{
        e.currentTarget.showPicker()
        if (typeof onDoubleClick == 'function')
            onDoubleClick(e)
    }, [onDoubleClick])

    return (
        <label className={s.wrap+' '+className}>
            {left || null}
            <input 
                {...etc}
                className={s.input}
                type='datetime-local' 
                value={inputValue}
                min={inputMin}
                onChange={onInputChange}
                onFocus={onInputFocus}
                onDoubleClick={onInputDoubleClick} />
            {right || null}
        </label>
    )
}