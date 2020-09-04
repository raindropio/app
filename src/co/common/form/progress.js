import s from './progress.module.styl'
import t from '~t'
import React from 'react'
import { fileSize } from '~modules/format/number'

export function Progress({ className='', children, hidden, display, ...etc }) {
    let value, prefix

    switch(display) {
        case 'percent':
            value = parseInt( 100 / etc.max * etc.value )+'%';
        break

        case 'file_size':
            prefix = fileSize(etc.value)
            value = `${t.s('of')} ${fileSize(etc.max)}`;
        break

        case 'infinite':
            prefix = etc.value
            value = '∞'; etc.max = 9999999999;
        break

        default:
            value = `${etc.value} / ${etc.max}`;
        break
    }

    return (
        <label className={s.wrap+' '+className} hidden={hidden}>
            <span className={s.title}>
                {prefix} {children}
            </span>

            <span className={s.value}>
                {value}
            </span>

            <progress className={s.progress} {...etc} />
        </label>
    )
}