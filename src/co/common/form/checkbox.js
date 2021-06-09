import s from './checkbox.module.styl'
import React from 'react'

export function Checkbox({ className='', children, hidden, ...etc }) {
    return (
        <label className={s.wrap+' '+className} hidden={hidden}>
            <input type='checkbox' tabIndex='0' className={s.checkbox} {...etc} />
            {children}
        </label>
    )
}