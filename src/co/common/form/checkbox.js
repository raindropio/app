import s from './checkbox.module.styl'
import React from 'react'

export function Checkbox({ className='', children, hidden, active, ...etc }) {
    return (
        <label className={s.wrap+' '+className+' '+(active?s.active:'')} hidden={hidden}>
            <input type='checkbox' tabIndex='0' className={s.checkbox} {...etc} />
            {children}
        </label>
    )
}