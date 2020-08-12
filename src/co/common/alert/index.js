import s from './index.module.styl'
import React from 'react'

export default function Alert({ className='', variant='info', children, ...etc }) {
    let icon = ''
    switch (variant) {
        case 'warning': icon = '⚠️'; break
    }

    return (
        <div 
            {...etc} 
            className={s.alert+' '+className+' '+s[variant]}>
            {icon && <span>{icon}&nbsp;</span>}
            {children}
        </div>
    )
}