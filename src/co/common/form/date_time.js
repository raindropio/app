import s from './date_time.module.styl'
import React, { useCallback, useMemo } from 'react'
import { format } from 'date-fns'

function DatePart({ onChange, value, ...etc }) {
    const date = useMemo(()=>{
        try {
            return format(new Date(value), 'yyyy-MM-dd')
        } catch(e) { return '' }
    }, [value])

    const onChangeDate = useCallback(e=>{
        const oldDate = new Date(value)
        const newDate = new Date(e.target.value)
        newDate.setHours(oldDate.getHours())
        newDate.setMinutes(oldDate.getMinutes())
        onChange(newDate)
    }, [value, onChange])

    const onFocusDate = useCallback(e=>e.target.showPicker(), [])

    return (
        <input
            {...etc}
            className={s.input}
            type='date'
            value={date}
            onChange={onChangeDate}
            onDoubleClick={onFocusDate} />
    )
}

function TimePart({ onChange, value, ...etc }) {
    const time = useMemo(()=>{
        try {
            return format(new Date(value), 'HH:mm')
        } catch(e) { return '' }
    }, [value])

    const onChangeTime = useCallback(e=>{
        const [h,m] = e.target.value.split(':')
        const date = new Date(value)
        date.setHours(h)
        date.setMinutes(m)
        onChange(date)
    }, [value, onChange])

    const onFocusTime = useCallback(e=>e.target.showPicker(), [])

    return (
        <input
            {...etc}
            className={s.input}
            type='time'
            value={time}
            onChange={onChangeTime}
            onDoubleClick={onFocusTime} />
    )
}

export function DateTime({ className='', left, right, ...etc }) {
    return (
        <div className={s.wrap + ' ' + className}>
            {left || null}
            <DatePart {...etc} />
            <TimePart {...etc} autoFocus={false} />
            {right || null}
        </div>
    )
}