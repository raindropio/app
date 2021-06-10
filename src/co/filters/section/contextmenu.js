import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem } from '~co/overlay/popover'

export default function CollectionsItemContextmenu({
    hidden,
    onContextMenuClose, onClick
}) {
    return (
        <Popover onClose={onContextMenuClose}>
            <Menu>
                <MenuItem onClick={onClick}>
                    {t.s(hidden ? 'show' : 'hide')} {t.s('fastFilter').toLowerCase()}
                </MenuItem>
            </Menu>
        </Popover>
    )
}