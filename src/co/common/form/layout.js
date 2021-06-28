import s from './layout.module.styl'
import React from 'react'

export function Layout({ className='', type, as='div', ...etc }) {
    const Component = as
    return <Component {...etc} className={s.layout+' '+className} data-type={type||'default'} />
}

export function Buttons({ className='', variant, ...etc }) {
    return <div {...etc} className={s.buttons+' '+className} data-variant={variant||'default'} />
}