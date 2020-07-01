import s from './title.module.styl'
import React from 'react'

export function Title({ className='', ...etc }) {
    return <div {...etc} data-is-title className={s.title+' '+className} />
}