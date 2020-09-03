import s from './progress.module.styl'
import React from 'react'

export function Progress({ className='', children, hidden, ...etc }) {
    return (
        <label className={s.wrap+' '+className} hidden={hidden}>
            <span className={s.title}>
                {children}
            </span>

            <span className={s.value}>
                {etc.value} / {etc.max}
            </span>

            <progress className={s.progress} {...etc} />
        </label>
    )
}