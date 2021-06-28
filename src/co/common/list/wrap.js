import s from './wrap.module.styl'
import React from 'react'

export function Wrap({ className='', ...etc }) {
    return (
        <div 
            {...etc}
            className={`${s.wrap} ${className}`} />
    )
}