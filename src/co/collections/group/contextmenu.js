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
                    <Icon name='select_all' />
                    {t.s('select')} {t.s('all')}
                </MenuItem>

                <MenuSeparator />

                <MenuItem onClick={onCreateNewCollectionClick}>
                    <Icon name='add' />
                    {t.s('createNewCollection')}
                </MenuItem>

                <MenuItem onClick={onCollapseAllClick}>
                    <Icon name='collapse_all' />
                    {t.s('collapseAll')} {t.s('collectionsCount')}
                </MenuItem>

                <MenuItem onClick={onSortAllByTitleClick}>
                    <Icon name='sort_title' />
                    {t.s('sortMin')} {t.s('all').toLowerCase()} {t.s('collectionsCount')} {t.s('byName').toLowerCase()}
                </MenuItem>

                <MenuItem onClick={onCleanClick}>
                    <Icon name='clear_circle' />
                    {t.s('remove')} {t.s('all').toLowerCase()} {t.s('collectionEmpty').toLowerCase()}
                </MenuItem>

                <MenuSeparator />

                <MenuItem onClick={onCreateNewGroupClick}>
                    <Icon name='plus' />
                    {t.s('createGroup')}
                </MenuItem>

                {/* Have write access */}
                { !system ? (
                    <>
                        <MenuItem onClick={onRenameClick}>
                            <Icon name='edit' />
                            {t.s('rename')}
                        </MenuItem>

                        <MenuItem onClick={onToggleClick}>
                            <Icon name={hidden ? 'show' : 'hide'} />
                            {t.s(hidden ? 'show' : 'hide')} {t.s('group').toLowerCase()}
                        </MenuItem>

                        <MenuItem onClick={onRemoveClick}>
                            <Icon name='trash' />
                            {t.s('remove')} {t.s('group').toLowerCase()}
                        </MenuItem>
                    </>
                ) : null}
            </Menu>
        </Popover>
    )
}