import s from './toggle.module.styl'
import React, { useCallback } from 'react'

export function Toggle({ className='', hidden, value, onChange, ...etc }) {
    const onClick = useCallback(e=>{
        e.preventDefault()
        onChange(!value)
    }, [value])

    return (
        <a {...etc} href='' className={s.toggle+' '+className+' '+(value ? s.on : s.off)} hidden={hidden} onClick={onClick}>
            <span />
        </a>
    )
}