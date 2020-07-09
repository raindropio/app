import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem, MenuSeparator } from '~co/overlay/popover'
import Icon from '~co/common/icon'

export default function CollectionsItemContextmenu({
    hidden,
    onContextMenuClose, onClick, onSortTagsById, onSortTagsByCount
}) {
    return (
        <Popover onClose={onContextMenuClose}>
            <Menu>
                <MenuItem onClick={onClick}>
                    <Icon name={hidden ? 'show' : 'hide'} />
                    {t.s(hidden ? 'show' : 'hide')} {t.s('group').toLowerCase()}
                </MenuItem>

                <MenuSeparator />

                <MenuItem onClick={onSortTagsById}>
                    <Icon name='sort_title' />
                    {t.s('sortMin')} {t.s('tags').toLowerCase()} {t.s('byName').toLowerCase()}
                </MenuItem>

                <MenuItem onClick={onSortTagsByCount}>
                    <Icon name='sort' />
                    {t.s('sortMin')} {t.s('tags').toLowerCase()} {t.s('byBookmarksCount').toLowerCase()}
                </MenuItem>
            </Menu>
        </Popover>
    )
}