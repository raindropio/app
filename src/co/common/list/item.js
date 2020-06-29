import s from './item.module.styl'
import React from 'react'

function ItemInner({ className='', active, color, style={}, ...etc }) {
    return (
        <div 
            active={active}
            {...etc}
            className={`${className} ${s.item} ${active && s.active}`}
            style={{'--accent-color': color, ...style}} />
    )
}

export const Item = React.forwardRef((props, ref) => {
    return <ItemInner {...props} forwardedRef={ref} />
})

export function ItemIcon({ className='', ...etc }) {
    return (
        <div {...etc} className={s.icon+' '+className} />
    )
}

export function ItemTitle({ className='', ...etc }) {
    return (
        <div {...etc} className={s.title+' '+className} />
    )
}

export function ItemInfo({ className='', ...etc }) {
    return (
        <div {...etc} className={s.info+' '+className} />
    )
}

export function ItemActions({ className='', ...etc }) {
    return (
        <div {...etc} className={s.actions+' '+className} />
    )
}