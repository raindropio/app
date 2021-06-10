import React from 'react'
import t from '~t'
import config from '~config'
import { target } from '~target'
import Popover, { Menu, MenuItem, MenuSeparator } from '~co/overlay/popover'

export default class CollectionsItemContextmenu extends React.Component {
    render() {
        const {
            _id, access, to,
            pin,
            onContextMenuClose, onCreateNewChildClick, onRenameClick, onIconClick, onRemoveClick, onSharing, onOpenAllClick, onSelectClick
        } = this.props

        return (
            <Popover pin={pin} onClose={onContextMenuClose}>
                <Menu>
                    {to && target!='web' ? (
                        <MenuItem href={new URL(to, config.links.app.index).toString()} target='_blank'>
                            {t.s('open')} {t.s('inNewTab')}
                        </MenuItem>
                    ) : null}

                    {onOpenAllClick ? <MenuItem onClick={onOpenAllClick}>
                        {t.s('open') + ' ' + t.s('allBookmarks').toLowerCase()}
                    </MenuItem> : null}

                    { _id>0 && access && access.level>=3 && onCreateNewChildClick ? (
                        <>
                            <MenuSeparator />
                            
                            <MenuItem onClick={onCreateNewChildClick}>
                                {t.s('createSubFolder')}
                            </MenuItem>

                            <MenuSeparator />
                        </>
                    ) : null}

                    { _id>0 && onSelectClick ? (
                        <MenuItem onClick={onSelectClick}>
                            {t.s('select')}
                        </MenuItem>
                    ) : null}

                    {/* Have write access */}
                    { _id>0 ? (access && access.level>=3 ? (
                        <>
                            {onRenameClick ? (
                                <MenuItem onClick={onRenameClick}>
                                    {t.s('rename')}
                                </MenuItem>
                            ) : null}

                            {onIconClick ? (
                                <MenuItem onClick={onIconClick}>
                                    {t.s('changeIcon')}
                                </MenuItem>
                            ) : null}

                            {onSharing ? (
                                <MenuItem onClick={onSharing}>
                                    {t.s('share')}
                                </MenuItem>
                            ) : null}

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

                    { _id==-99 ? (
                        <MenuItem onClick={onRemoveClick}>
                            {t.s('emptyTrash')}
                        </MenuItem>
                    ) : null}
                </Menu>
            </Popover>
        )
    }
}