import s from './content.module.styl'
import React from 'react'

export default function SplitViewSidebarContent({ className='', children }) {
    return (
        <div className={s.content+' '+className}>
            {children}
        </div>
    )
}