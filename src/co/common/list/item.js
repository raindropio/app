import s from './item.module.styl'
import React from 'react'
import Icon from '~co/common/icon'

function ItemInner({ className='', active, expandable, expanded, color, level, isDragging, isDropping, style, forwardedRef, ...etc }) {
    return (
        <div 
            {...etc}
            ref={forwardedRef}
            className={`${s.item} ${className} ${active && s.active} ${expandable && (expanded ? s.expanded : s.collapsed)} ${isDragging && s.isDragging} ${isDropping && s.isDropping}`}
            style={{'--accent-color': color, '--level': level, ...style}} />
    )
}

export const Item = React.forwardRef((props, ref) => {
    return <ItemInner {...props} forwardedRef={ref} />
})

export function ItemExpand({ className='', ...etc }) {
    return (
        <div {...etc} className={s.expand+' '+className}>
            <Icon name='arrow_alt' />
        </div>
    )
}

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