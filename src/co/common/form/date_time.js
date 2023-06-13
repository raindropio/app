import s from './date_time.module.styl'
import React, { useMemo, useCallback, useRef } from 'react'
import { format } from 'date-fns'
import parseISO from 'date-fns/parseISO'

import Button from '~co/common/button'
import { LongDateTime } from '~modules/format/date/longTime'

export function DateTime({ className='', icon, value, min, onChange, ...etc }) {
    const ref = useRef(null)

    const onButtonClick = useCallback(e=>{
        e.preventDefault()
        ref.current.showPicker()
    }, [ref])

    //input
    const convert = useCallback(date=>{
        try {
            return format(date instanceof Date ? date : parseISO(date), 'yyyy-MM-dd\'T\'HH:mm')
        } catch(e) {
            console.error(e)
            return undefined
        }
    }, [])

    const inputValue = useMemo(()=>convert(value), [value, convert])
    const inputMin = useMemo(()=>convert(min), [min, convert])

    const onInputChange = useCallback(e=>{
        const value = e.currentTarget.value
        onChange(value ? new Date(value) : undefined)
    }, [onChange])

    return (
        <Button 
            className={s.wrap+' '+className}
            {...etc}
            onClick={onButtonClick}>
            {icon}
            <LongDateTime date={value} />
            <input 
                ref={ref}
                className={s.input}
                type='datetime-local' 
                value={inputValue}
                min={inputMin}
                onChange={onInputChange} />
        </Button>
    )
}