import s from './index.module.styl'
import React from 'react'

function Header({ Tag='div', className='', forwardedRef, ...etc }) {
    return (
        <Tag 
            ref={forwardedRef}
            className={s.header+' '+className}
            {...etc} />
    )
}

export default React.forwardRef((props, ref) => {
    return <Header {...props} forwardedRef={ref} />
})

export function Title({ className='', ...etc }) {
    return (
        <div 
            className={s.title+' '+className}
            {...etc} />
    )
}

export function Space() {
    return <div className={s.space} />
}

export function FirstAction({ className='', ...etc }) {
    return (
        <div 
            className={s.firstAction+' '+className}
            {...etc} />
    )
}

export function LastAction({ className='', ...etc }) {
    return (
        <div 
            className={s.lastAction+' '+className}
            {...etc} />
    )
}