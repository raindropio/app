import s from './wrap.module.styl'
import React from 'react'

export function Wrap({ as='div', className='', ...etc }) {
    const Component = as

    return (
        <Component 
            {...etc}
            className={`${s.wrap} ${className}`} />
    )
}