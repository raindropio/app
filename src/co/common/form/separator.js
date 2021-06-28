import s from './separator.module.styl'
import React from 'react'

export function Separator({ className='', variant, ...etc }) {
    return (
        <div 
            {...etc} 
            className={s.separator+' '+className}
            data-variant={variant||'default'} />
    )
}