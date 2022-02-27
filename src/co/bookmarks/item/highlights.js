import s from './highlights.module.styl'
import React from 'react'
import Icon from '~co/common/icon'
import Text from '~co/highlights/text'

export default function BookmarksItemHighlights({ highlights }) {
    if (!highlights.length) return null

    return highlights.map(({ _id, color, text, note })=>(
        <Text 
            key={_id||'new'}
            className={s.highlight}
            color={color}>
            {note ? <Icon name='comment' size='micro' className={s.note} /> : null}
            {text}
        </Text>
    ))
}