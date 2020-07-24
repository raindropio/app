import s from './icon.module.styl'
import React from 'react'
import Icon from '~co/common/icon'

const predefined = {
    notag: 'tag'
}

export default function FiltersItemIcon({ _id }) {
    let icon = predefined[_id] || _id

    return (
        <Icon 
            className={s[_id]}
            name={icon}
            size='micro' />
    )
}