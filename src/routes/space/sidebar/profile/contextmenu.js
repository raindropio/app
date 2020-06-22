import React from 'react'
import t from '~t'
import config from '~config'
import Popover, { Menu, MenuItem, MenuSeparator } from '~co/overlay/popover'
import Icon from '~co/common/icon'

export default function SidebarProfileMenu({
    pin,
    actions,
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
                    {t.s('install')} {t.s('interest_technology_applications').toLowerCase()}
                </MenuItem>

                <MenuItem href={config.links.help} target='_blank'>
                    <Icon name='help' />
                    {t.s('help')}
                </MenuItem>

                <MenuItem href={config.links.blog} target='_blank'>
                    <Icon name='article' />
                    {t.s('blog')}
                </MenuItem>

                <MenuSeparator />

                <MenuItem onClick={actions.logout}>
                    <Icon name='exit' />
                    {t.s('logOut')}
                </MenuItem>
            </Menu>
        </Popover>
    )
}