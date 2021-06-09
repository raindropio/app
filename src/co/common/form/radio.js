import s from './radio.module.styl'
import React from 'react'

export function Radio({ className='', style, children, ...etc }) {
    return (
        <label className={s.wrap+' '+className} style={style} data-disabled={etc.disabled}>
            <input type='radio' tabIndex='0' className={s.radio} {...etc} />
            {children}
        </label>
    )
}