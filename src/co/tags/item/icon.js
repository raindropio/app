import s from './icon.module.styl'
import React from 'react'

import { ItemIcon } from '~co/common/list'
import Icon from '~co/common/icon'

export default function TagsItemIcon() {
    return (
        <ItemIcon className={s.icon}>
            <Icon 
                name='tag'
                size='micro' />
        </ItemIcon>
    )
}