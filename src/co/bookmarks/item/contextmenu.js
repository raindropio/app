import React from 'react'
import t from '~t'
import { API_ENDPOINT_URL } from '~data/constants/app'
import Popover, { Menu, MenuItem, MenuSeparator } from '~co/overlay/popover'
import { target } from '~target'

export default function BookmarksItemContextmenu({
    _id, link, important, access, reparse, cache, fileType, type,
    onContextMenuClose, onRemoveClick, onCopyLinkClick,
    onSelectClick, onImportantClick, onReparseClick
}) {
    return (
        <Popover onClose={onContextMenuClose}>
            <Menu>
                <MenuItem href={link} rel='noopener' target='_blank'>
                    {t.s('open')} {t.s('inNewTab')}
                </MenuItem>

                <MenuItem onClick={onCopyLinkClick}>
                    {t.s('copyLinkToClipboard')}
                </MenuItem>

                <MenuSeparator />

                {target != 'extension' && (
                    <MenuItem to={`item/${_id}/${type == 'link' ? 'web' : 'preview'}`}>
                        {t.s('preview')}
                    </MenuItem>
                )}

                {access && access.level >= 2 ? (
                    <MenuItem to={`item/${_id}/cache`}>
                        {cache && cache != 'ready' ? '⚠️ ' : ''}{t.s('open')} {t.s('permanentCopy').toLowerCase()}
                    </MenuItem>
                ) : null}

                {fileType ? (
                    <MenuItem href={`${API_ENDPOINT_URL}raindrop/${_id}/file?download`}>
                        {t.s('download')}
                    </MenuItem>
                ) : null}

                {access && access.level >= 3 ? (
                    <>
                        <MenuSeparator />

                        <MenuItem onClick={onSelectClick}>
                            {t.s('select')}
                        </MenuItem>

                        <MenuItem onClick={onImportantClick}>
                            {(important ? (t.s('remove')+' '+t.s('from')) : (t.s('add') +' ' + t.s('to'))) + ' ' + t.s('favorites').toLowerCase()}
                        </MenuItem>

                        {!reparse ? (
                            <MenuItem onClick={onReparseClick}>
                                {t.s('refresh')+' '+t.s('preview').toLowerCase()}
                            </MenuItem>
                        ) : null}

                        <MenuSeparator />

                        <MenuItem to={`item/${_id}/edit`}>
                            {t.s('edit')}
                        </MenuItem>

                        <MenuItem onClick={onRemoveClick}>
                            {t.s('remove')}
                        </MenuItem>
                    </>
                ) : null}
            </Menu>
        </Popover>
    )
}