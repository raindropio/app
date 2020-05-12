import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem, MenuSeparator } from '~co/popover'
import Icon from '~co/common/icon'

export default function CollectionsItemContextmenu({
    to,
    onContextMenuClose, onRenameClick, onRemoveClick
}) {
    return (
        <Popover onClose={onContextMenuClose}>
            <Menu>
                <MenuItem href={`https://app.raindrop.io/#${to}`} target='_blank'>
                    <Icon name='open' />
                    {t.s('openInBrowser')}
                </MenuItem>

                <MenuSeparator />

                {onRenameClick && (
                    <MenuItem onClick={onRenameClick}>
                        <Icon name='edit' />
                        {t.s('edit')}
                    </MenuItem>
                )}

                {onRemoveClick && (<MenuItem onClick={onRemoveClick}>
                    <Icon name='trash' />
                    {t.s('remove')}
                </MenuItem>)}
            </Menu>
        </Popover>
    )
}