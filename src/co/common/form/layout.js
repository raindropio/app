import s from './layout.module.styl'
import React from 'react'

export function Layout({ className='', type='default', ...etc }) {
    return <div {...etc} className={s.layout+' '+className} data-type={type} />
}

export function Buttons({ className='', variant='default', ...etc }) {
    return <div {...etc} className={s.buttons+' '+className} data-variant={variant} />
}