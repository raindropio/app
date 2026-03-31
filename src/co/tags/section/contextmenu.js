import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem, MenuSeparator } from '~co/overlay/popover'

export default function CollectionsItemContextmenu({
    item: {hidden},
    onContextMenuClose, onClick, onSortTagsById, onSortTagsByCount
}) {
    return (
        <Popover onClose={onContextMenuClose}>
            <Menu>
                <MenuItem onClick={onClick}>
                    {t.s(hidden ? 'showTags' : 'hideTags')}
                </MenuItem>

                <MenuSeparator />

                <MenuItem onClick={onSortTagsById}>
                    {t.s('sortTagsByName')}
                </MenuItem>

                <MenuItem onClick={onSortTagsByCount}>
                    {t.s('sortTagsByCount')}
                </MenuItem>
            </Menu>
        </Popover>
    )
}