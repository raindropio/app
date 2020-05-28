import React from 'react'

export function Menu({ children }) {
    return (
        <div className='contextMenuList'>
            {children}
        </div>
    )
}

export * from './item'
export * from './separator'