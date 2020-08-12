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
                    <Icon name='install' />
                    {t.s('interest_technology_applications')}
                </MenuItem>

                <MenuItem href={config.links.download} target='_blank'>
                    <Icon name='extension' />
                    {t.s('browserExtension')}
                </MenuItem>

                <MenuItem href={config.links.help.index} target='_blank'>
                    <Icon name='help' />
                    {t.s('help')}
                </MenuItem>

                <MenuItem href={config.links.blog} target='_blank'>
                    <Icon name='article' />
                    {t.s('blog')}
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