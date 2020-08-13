import React from 'react'
import t from '~t'
import config from '~config'
import Popover, { Menu, MenuItem, MenuSeparator } from '~co/overlay/popover'
import Icon from '~co/common/icon'

export default function SidebarProfileMenu({
    pin,
    onLogoutClick,
    onMenuClose
}) {
    return (
        <Popover pin={pin} onClose={onMenuClose}>
            <Menu>
                <MenuItem to='/settings'>
                    <Icon name='settings' />
                    {t.s('settings')}
                </MenuItem>

                <MenuSeparator />

                <MenuItem href={config.links.download} target='_blank'>
                    <Icon name='extension' />
                    {t.s('install')} {t.s('browserExtension').toLowerCase()}
                </MenuItem>

                <MenuItem href={config.links.download} target='_blank'>
                    <Icon name='install' />
                    {t.s('download')} {t.s('app').toLowerCase()}
                </MenuItem>

                <MenuSeparator />

                <MenuItem href={config.links.help.index} target='_blank'>
                    <Icon name='help' />
                    {t.s('help')} {t.s('und')} {t.s('support').toLowerCase()}
                </MenuItem>

                <MenuItem href={config.links.blog} target='_blank'>
                    <Icon name='history' />
                    {t.s('whatsNew')}?
                </MenuItem>

                <MenuItem href={config.links.blog} target='_blank'>
                    <Icon name='like' />
                    {t.s('pro_nextFeatures')}
                </MenuItem>

                <MenuItem href={config.links.twitter} target='_blank'>
                    <Icon name='twitter' />
                    Twitter
                </MenuItem>

                <MenuSeparator />

                <MenuItem onClick={onLogoutClick}>
                    <Icon name='exit' />
                    {t.s('logOut')}
                </MenuItem>
            </Menu>
        </Popover>
    )
}