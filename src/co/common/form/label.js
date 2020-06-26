import s from './label.module.styl'
import React from 'react'

export function Label({ className='', ...etc }) {
    return <div {...etc} className={s.label+' '+className} />
}