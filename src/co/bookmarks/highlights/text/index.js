import s from './index.module.styl'
import React from 'react'

export default function HighlightsText({ className='', color, ...etc }) {
    return (
        <div 
            {...etc}
            className={s.text + ' ' + className}
            style={{'--highlight-color': color}} />
    )
}