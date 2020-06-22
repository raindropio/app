import s from './index.module.styl'
import React from 'react'

export function Menu({ children }) {
    return (
        <div className={s.menu}>
            {children}
        </div>
    )
}

export * from './item'
export * from './separator'