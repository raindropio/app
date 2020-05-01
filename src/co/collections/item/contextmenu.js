import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem, MenuSeparator } from '~co/popover'

export default function CollectionsItemContextmenu({
    _id, access, to,
    onContextMenuClose, onCreateNewChildClick, onRenameClick, onRemoveClick
}) {
    return (
        <Popover onClose={onContextMenuClose}>
            <Menu>
                <MenuItem href={`https://app.raindrop.io/#${to}`} target='_blank'>
                    {t.s('openInBrowser')}
                </MenuItem>

                {/* Have write access */}
                { _id>0 ? (access.level>=3 ? (
                    <>
                        <MenuItem onClick={onCreateNewChildClick}>
                            {t.s('createSubFolder')}
                        </MenuItem>

                        <MenuSeparator />

                        <MenuItem onClick={onRenameClick}>
                            {t.s('edit')}
                        </MenuItem>

                        <MenuItem onClick={onRemoveClick}>
                            {t.s('remove')}
                        </MenuItem>
                    </>
                ) :
                //Just a viewer
                (
                    <MenuItem onClick={onRemoveClick}>
                        {t.s('leave')}
                    </MenuItem>
                )) : null}

                { _id==-99 && (
                    <MenuItem onClick={onRemoveClick}>
                        {t.s('removeIt')} {t.s('all').toLowerCase()} {t.s('in')} {t.s('defaultCollection--99').toLowerCase()}
                    </MenuItem>
                ) }
            </Menu>
        </Popover>
    )
}