import s from './sub_label.module.styl'
import React from 'react'

export function SubLabel({ className='', ...etc }) {
    return <div {...etc} className={s.subLabel+' '+className} data-is-sub-label />
}