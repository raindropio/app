import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem, MenuSeparator } from '~co/overlay/popover'
import Icon from '~co/common/icon'

export default function CollectionsItemContextmenu({
    system, hidden,
    onContextMenuClose, onCreateNewGroupClick, onRenameClick, onToggleClick, onRemoveClick, onCollapseAllClick, onSortAllByTitleClick, onSelectAll, onCreateNewCollectionClick, onCleanClick
}) {
    return (
        <Popover onClose={onContextMenuClose}>
            <Menu>
                <MenuItem onClick={onSelectAll}>
                    {t.s('selectAll')}
                </MenuItem>

                <MenuSeparator />

                <MenuItem onClick={onCreateNewCollectionClick}>
                    {t.s('createNewCollection')}
                </MenuItem>

                <MenuItem onClick={onCollapseAllClick}>
                    {t.s('collapseAllCollections')}
                </MenuItem>

                <MenuItem onClick={onSortAllByTitleClick}>
                    {t.s('sortAllCollectionsByName')}
                </MenuItem>

                <MenuItem onClick={onCleanClick}>
                    {t.s('removeAllEmptyCollections')}
                </MenuItem>

                <MenuSeparator />

                <MenuItem onClick={onCreateNewGroupClick}>
                    {t.s('createGroup')}
                </MenuItem>

                {/* Have write access */}
                { !system ? (
                    <>
                        <MenuItem onClick={onRenameClick}>
                            {t.s('rename')}
                        </MenuItem>

                        <MenuItem onClick={onToggleClick}>
                            {t.s(hidden ? 'showGroup' : 'hideGroup')}
                        </MenuItem>

                        <MenuItem onClick={onRemoveClick}>
                            {t.s('removeGroup')}
                        </MenuItem>
                    </>
                ) : null}
            </Menu>
        </Popover>
    )
}