import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem } from '~co/overlay/popover'
import Icon from '~co/common/icon'

export default function CollectionsItemContextmenu({
    hidden,
    onContextMenuClose, onClick
}) {
    return (
        <Popover onClose={onContextMenuClose}>
            <Menu>
                <MenuItem onClick={onClick}>
                    <Icon name={hidden ? 'show' : 'hide'} />
                    {t.s(hidden ? 'show' : 'hide')} {t.s('group').toLowerCase()}
                </MenuItem>
            </Menu>
        </Popover>
    )
}