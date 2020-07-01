import React from 'react'
import t from '~t'
import config from '~config'
import Popover, { Menu, MenuItem, MenuSeparator } from '~co/overlay/popover'
import { Layout, Checkbox, Label } from '~co/common/form'
import Icon from '~co/common/icon'

export default function SidebarProfileMenu({
    pin,
    theme,
    appSize,
    onLogoutClick,
    onToggleDarkThemeClick,
    onToggleLargeFontSizeClick,
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

                <MenuItem onClick={onLogoutClick}>
                    <Icon name='exit' />
                    {t.s('logOut')}
                </MenuItem>
            </Menu>

            <Layout>
                <Label>{t.s('window')}</Label>
                <div>
                    <Checkbox 
                        checked={theme=='night'}
                        onChange={onToggleDarkThemeClick}>
                        Dark {t.s('interfaceStyle').toLowerCase()}
                    </Checkbox>

                    <Checkbox 
                        checked={appSize=='large'}
                        onChange={onToggleLargeFontSizeClick}>
                        Large {t.s('fontSize').toLowerCase()}
                    </Checkbox>
                </div>
            </Layout>
        </Popover>
    )
}