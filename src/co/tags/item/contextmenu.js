import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem } from '~co/overlay/popover'

export default function CollectionsItemContextmenu({
    onContextMenuClose, onRenameClick, onRemoveClick
}) {
    return (
        <Popover onClose={onContextMenuClose}>
            <Menu>
                {onRenameClick ? (
                    <MenuItem onClick={onRenameClick}>
                        {t.s('rename')} {t.s('tag')}
                    </MenuItem>
                ) : null}

                {onRemoveClick ? (<MenuItem onClick={onRemoveClick}>
                    {t.s('remove')} {t.s('tag')}
                </MenuItem>) : null}
            </Menu>
        </Popover>
    )
}