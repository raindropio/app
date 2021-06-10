import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem, MenuSeparator } from '~co/overlay/popover'

export default function BookmarksItemContextmenu({
    _id, link, important, access, reparse, cache, getLink,
    onContextMenuClose, onRemoveClick, onCopyLinkClick,
    onSelectClick, onImportantClick, onCreateScreenshotClick, onReparseClick
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

                <MenuItem to={getLink({ bookmark: _id, tab: '' })}>
                    {t.s('preview')}
                </MenuItem>

                {access && access.level >= 2 && cache ? (
                    <MenuItem to={getLink({ bookmark: _id, tab:'cache' })}>
                        {cache != 'ready' ? '⚠️ ' : ''}{t.s('permanentCopy')}
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

                        <MenuItem onClick={onCreateScreenshotClick}>
                            {t.s('clickToMakeScreenshot')}
                        </MenuItem>

                        {!reparse ? (
                            <MenuItem onClick={onReparseClick}>
                                {t.s('refresh')+' '+t.s('preview').toLowerCase()}
                            </MenuItem>
                        ) : null}

                        <MenuSeparator />

                        <MenuItem to={getLink({ bookmark: _id, tab:'edit' }, true)}>
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