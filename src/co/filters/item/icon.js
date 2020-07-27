import s from './icon.module.styl'
import React from 'react'
import Icon from '~co/common/icon'
import { ItemIcon } from '~co/common/list'

const predefined = {
    notag: 'tag'
}

export default function FiltersItemIcon({ _id }) {
    let icon = predefined[_id] || _id

    return (
        <ItemIcon className={s.icon+' '+s[_id]}>
            <Icon 
                name={icon}
                size='micro' />
        </ItemIcon>
    )
}