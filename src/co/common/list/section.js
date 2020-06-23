import s from './section.module.styl'
import React from 'react'

export function Section({ className='', active, isDragging, isDropping, ...etc }) {
    return (
        <div 
            {...etc}
            className={`${s.section} ${className} ${active && s.active} ${isDragging && s.isDragging} ${isDropping && s.isDropping}`} />
    )
}

export function SectionTitle({ className='', ...etc }) {
    return (
        <div {...etc} className={s.title+' '+className} />
    )
}

export function SectionActions({ className='', ...etc }) {
    return (
        <div {...etc} className={s.actions+' '+className} />
    )
}