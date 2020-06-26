import s from './checkbox.module.styl'
import React from 'react'

export function Checkbox({ className='', children, ...etc }) {
    return (
        <label className={s.wrap+' '+className}>
            <input type='checkbox' className={s.checkbox} {...etc} />
            {children}
        </label>
    )
}