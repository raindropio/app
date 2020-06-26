import s from './range.module.styl'
import React from 'react'

export function Range({ className='', ...etc }) {
    return (
        <label className={s.wrap+' '+className} data-disabled={etc.disabled}>
            <input type='range' className={s.range} {...etc} />
        </label>
    )
}