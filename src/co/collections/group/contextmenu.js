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
                    {t.s('select')} {t.s('all')}
                </MenuItem>

                <MenuSeparator />

                <MenuItem onClick={onCreateNewCollectionClick}>
                    {t.s('createNewCollection')}
                </MenuItem>

                <MenuItem onClick={onCollapseAllClick}>
                    {t.s('collapseAll')} {t.s('collectionsCount')}
                </MenuItem>

                <MenuItem onClick={onSortAllByTitleClick}>
                    {t.s('sortMin')} {t.s('all').toLowerCase()} {t.s('collectionsCount')} {t.s('byName').toLowerCase()}
                </MenuItem>

                <MenuItem onClick={onCleanClick}>
                    {t.s('remove')} {t.s('all').toLowerCase()} {t.s('collectionEmpty').toLowerCase()}
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
                            {t.s(hidden ? 'show' : 'hide')} {t.s('group').toLowerCase()}
                        </MenuItem>

                        <MenuItem onClick={onRemoveClick}>
                            {t.s('remove')} {t.s('group').toLowerCase()}
                        </MenuItem>
                    </>
                ) : null}
            </Menu>
        </Popover>
    )
}