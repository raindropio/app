import s from './radio.module.styl'
import React from 'react'

export function Radio({ className='', children, ...etc }) {
    return (
        <label className={s.wrap+' '+className} data-disabled={etc.disabled}>
            <input type='radio' className={s.radio} {...etc} />
            {children}
        </label>
    )
}