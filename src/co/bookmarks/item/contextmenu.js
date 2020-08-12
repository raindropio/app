import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem, MenuSeparator } from '~co/overlay/popover'
import Icon from '~co/common/icon'

export default function BookmarksItemContextmenu({
    _id, link, important, access, reparse, cache, getLink,
    onContextMenuClose, onRemoveClick, onCopyLinkClick,
    onSelectClick, onImportantClick, onCreateScreenshotClick, onReparseClick
}) {
    return (
        <Popover onClose={onContextMenuClose}>
            <Menu>
                <MenuItem href={link} target='_blank'>
                    <Icon name='open' />
                    {t.s('open')} {t.s('inNewTab')}
                </MenuItem>

                <MenuItem onClick={onCopyLinkClick}>
                    <Icon name='duplicates' />
                    {t.s('copyLinkToClipboard')}
                </MenuItem>

                <MenuSeparator />

                <MenuItem to={getLink({ bookmark: _id, tab: '' })}>
                    <Icon name='show' />
                    {t.s('preview')}
                </MenuItem>

                {access.level >= 2 && cache ? (
                    <MenuItem to={getLink({ bookmark: _id, tab:'cache' })}>
                        <Icon name={cache ? 'cache_ready' : 'cache_failed'} />
                        {cache != 'ready' ? '⚠️ ' : ''}{t.s('permanentCopy')}
                    </MenuItem>
                ) : null}

                {access.level >= 3 ? (
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

                        {!reparse ? (
                            <MenuItem onClick={onReparseClick}>
                                <Icon name='refresh' />
                                {t.s('refresh')+' '+t.s('preview').toLowerCase()}
                            </MenuItem>
                        ) : null}

                        <MenuSeparator />

                        <MenuItem to={getLink({ bookmark: _id, tab:'edit' }, true)}>
                            <Icon name='edit' />
                            {t.s('edit')}
                        </MenuItem>

                        <MenuItem onClick={onRemoveClick}>
                            <Icon name='trash' />
                            {t.s('remove')}
                        </MenuItem>
                    </>
                ) : null}
            </Menu>
        </Popover>
    )
}