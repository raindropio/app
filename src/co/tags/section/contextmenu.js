import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem, MenuSeparator } from '~co/overlay/popover'

export default function CollectionsItemContextmenu({
    hidden,
    onContextMenuClose, onClick, onSortTagsById, onSortTagsByCount
}) {
    return (
        <Popover onClose={onContextMenuClose}>
            <Menu>
                <MenuItem onClick={onClick}>
                    {t.s(hidden ? 'show' : 'hide')} {t.s('tags').toLowerCase()}
                </MenuItem>

                <MenuSeparator />

                <MenuItem onClick={onSortTagsById}>
                    {t.s('sortMin')} {t.s('tags').toLowerCase()} {t.s('byName').toLowerCase()}
                </MenuItem>

                <MenuItem onClick={onSortTagsByCount}>
                    {t.s('sortMin')} {t.s('tags').toLowerCase()} {t.s('byBookmarksCount').toLowerCase()}
                </MenuItem>
            </Menu>
        </Popover>
    )
}