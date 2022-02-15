import s from './highlights.module.styl'
import React from 'react'
import Icon from '~co/common/icon'

export default function BookmarksItemHighlights({ highlights }) {
    if (!highlights.length) return null

    return highlights.map(({ _id, color, text, note })=>(
        <div 
            key={_id} 
            className={s.highlight}
            style={{'--highlight-color': color}}>
            {text}

            {note ? <Icon name='comment' size='micro' className={s.note} /> : null}
        </div>
    ))
}