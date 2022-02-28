import React from 'react'
import t from '~t'
import { Link } from 'react-router-dom'
import { MenuItem } from '~co/overlay/popover'
import Icon from '~co/common/icon'

export default function BookmarksAddExtensionHighlights() {
    return (
        <MenuItem 
            as={Link}
            to={'/extension/highlights'}>
            <Icon name='highlights' />
            {t.s('add')} {t.s('highlights').toLowerCase()}…
        </MenuItem>
    )
}