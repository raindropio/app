import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem } from '~co/overlay/popover'

export default function CollectionsItemContextmenu({
    item: { hidden },
    onContextMenuClose, onClick
}) {
    return (
        <Popover onClose={onContextMenuClose}>
            <Menu>
                <MenuItem onClick={onClick}>
                    {t.s(hidden ? 'showFilters' : 'hideFilters')}
                </MenuItem>
            </Menu>
        </Popover>
    )
}