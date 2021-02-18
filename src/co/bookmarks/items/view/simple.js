import s from './simple.module.styl'
import React from 'react'

export default function BookmarksItemsSimple({ className='', children }) {
    return (
        <div className={s.simple+' '+className}>
            {children}
        </div>
    )
}