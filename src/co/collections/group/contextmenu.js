import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem, MenuSeparator } from '~co/popover'

export default function CollectionsItemContextmenu({
    system, hidden,
    onContextMenuClose, onCreateNewCollectionClick, onCreateNewGroupClick, onRenameClick, onToggleClick, onRemoveClick, onCollapseAllClick, onSortAllByTitleClick
}) {
    return (
        <Popover onClose={onContextMenuClose}>
            <Menu>
                <MenuItem onClick={onCreateNewCollectionClick}>
                    {t.s('createNewCollection')}
                </MenuItem>

                <MenuSeparator />

                <MenuItem onClick={onCollapseAllClick}>
                    {t.s('collapseAll')} {t.s('collectionsCount')}
                </MenuItem>

                <MenuItem onClick={onSortAllByTitleClick}>
                    {t.s('sortMin')} {t.s('all').toLowerCase()} {t.s('collectionsCount')} {t.s('byName').toLowerCase()}
                </MenuItem>

                <MenuSeparator />

                <MenuItem onClick={onCreateNewGroupClick}>
                    {t.s('createGroup')}
                </MenuItem>

                {/* Have write access */}
                { !system && (
                    <>
                        <MenuItem onClick={onRenameClick}>
                            {t.s('edit')} {t.s('group').toLowerCase()}
                        </MenuItem>

                        <MenuItem onClick={onToggleClick}>
                            {t.s(hidden ? 'show' : 'hide')} {t.s('group').toLowerCase()}
                        </MenuItem>

                        <MenuItem onClick={onRemoveClick}>
                            {t.s('remove')} {t.s('group').toLowerCase()}
                        </MenuItem>
                    </>
                )}
            </Menu>
        </Popover>
    )
}