import React from 'react'
import t from '~t'
import { Link } from 'react-router-dom'
import { MenuItem } from '~co/overlay/popover'
import Icon from '~co/common/icon'

export default function BookmarksAddExtensionTabs({ spaceId }) {
    return (
        <MenuItem 
            as={Link}
            to={`/extension/tabs/${spaceId}`}>
            <Icon name='add_tabs' />
            {t.s('save')} {t.s('tabs').toLowerCase()}…
        </MenuItem>
    )
}