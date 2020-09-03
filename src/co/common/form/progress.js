import s from './progress.module.styl'
import React from 'react'

export function Progress({ className='', children, hidden, display, ...etc }) {
    let value

    switch(display) {
        case 'percent': value = parseInt( 100 / etc.max * etc.value )+'%'; break
        default:        value = `${etc.value} / ${etc.max}`; break
    }

    return (
        <label className={s.wrap+' '+className} hidden={hidden}>
            <span className={s.title}>
                {children}
            </span>

            <span className={s.value}>
                {value}
            </span>

            <progress className={s.progress} {...etc} />
        </label>
    )
}