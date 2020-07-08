import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem } from '~co/overlay/popover'
import Icon from '~co/common/icon'

export default function CollectionsItemContextmenu({
    onContextMenuClose, onRenameClick, onRemoveClick
}) {
    return (
        <Popover onClose={onContextMenuClose}>
            <Menu>
                {onRenameClick ? (
                    <MenuItem onClick={onRenameClick}>
                        <Icon name='edit' />
                        {t.s('edit')}
                    </MenuItem>
                ) : null}

                {onRemoveClick ? (<MenuItem onClick={onRemoveClick}>
                    <Icon name='trash' />
                    {t.s('remove')}
                </MenuItem>) : null}
            </Menu>
        </Popover>
    )
}