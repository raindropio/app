import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem, MenuSeparator } from '~co/popover'
import Icon from '~co/common/icon'

export default function CollectionsItemContextmenu({
    link, important, access, reparse, cache,
    onContextMenuClose, onRemoveClick, onCopyLinkClick, onPreviewClick, onCacheClick,
    onSelectClick, onImportantClick, onCreateScreenshotClick, onReparseClick,
    onEditClick
}) {
    console.log(cache)
    return (
        <Popover onClose={onContextMenuClose}>
            <Menu>
                <MenuItem href={link} target='_blank'>
                    <Icon name='open' />
                    {t.s('openInBrowser')}
                </MenuItem>

                <MenuItem onClick={onCopyLinkClick}>
                    <Icon name='duplicates' />
                    {t.s('copyLinkToClipboard')}
                </MenuItem>

                <MenuSeparator />

                <MenuItem onClick={onPreviewClick}>
                    <Icon name='article' />
                    {t.s('open')+' '+t.s('preview').toLowerCase()}
                </MenuItem>

                {access.level >= 2 && cache ? (
                    <MenuItem onClick={onCacheClick}>
                        <Icon name={cache ? 'cache_ready' : 'cache_failed'} />
                        {cache != 'ready' ? '⚠️ '+t.s('permanentCopy') : t.s('open') + ' ' +t.s('permanentCopy').toLowerCase()}
                    </MenuItem>
                ) : null}

                {access.level >= 3 && (
                    <>
                        <MenuSeparator />

                        <MenuItem onClick={onSelectClick}>
                            <Icon name='select_all' />
                            {t.s('select')}
                        </MenuItem>

                        <MenuItem onClick={onImportantClick}>
                            <Icon name={'like'+(important?'_active':'')} />
                            {(important ? (t.s('remove')+' '+t.s('from')) : (t.s('add') +' ' + t.s('to'))) + ' ' + t.s('favoriteSites').toLowerCase()}
                        </MenuItem>

                        <MenuItem onClick={onCreateScreenshotClick}>
                            <Icon name='web' />
                            {t.s('clickToMakeScreenshot')}
                        </MenuItem>

                        {!reparse && (
                            <MenuItem onClick={onReparseClick}>
                                <Icon name='refresh' />
                                {t.s('refresh')+' '+t.s('preview').toLowerCase()}
                            </MenuItem>
                        )}

                        <MenuSeparator />

                        <MenuItem onClick={onEditClick}>
                            <Icon name='new_note' />
                            {t.s('edit')}
                        </MenuItem>

                        <MenuItem onClick={onRemoveClick}>
                            <Icon name='trash' />
                            {t.s('remove')}
                        </MenuItem>
                    </>
                )}
            </Menu>
        </Popover>
    )
}