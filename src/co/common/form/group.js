import s from './group.module.styl'
import React from 'react'

export function Group({ className='', ...etc }) {
    return <div {...etc} className={s.group+' '+className} />
}