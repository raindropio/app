import React from 'react'
import t from '~t'
import config from '~config'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '~data/actions/user'
import { user } from '~data/selectors/user'
import { target, environment } from '~target'

import Popover, { Menu, MenuItem, MenuSeparator } from '~co/overlay/popover'
import Icon from '~co/common/icon'

function UserProfileMenu({
    pin,
    onClose,

    logout
}) {
    const location = useLocation()

    return (
        <Popover pin={pin} onClose={onClose}>
            <Menu>
                <MenuItem to={`/settings?back=${encodeURIComponent(location.pathname + location.search)}`}>
                    <Icon name='settings' />
                    {t.s('settings')}
                </MenuItem>

                <MenuSeparator />

                {target != 'extension' && (
                    <MenuItem href={config.links.download} target='_blank'>
                        <Icon name='extension' />
                        {t.s('browserExtension')}
                    </MenuItem>
                )}

                {!environment.includes('safari') && (
                    <MenuItem href={config.links.download} target='_blank'>
                        <Icon name='install' />
                        {t.s('download')} {t.s('app').toLowerCase()}
                    </MenuItem>
                )}

                <MenuSeparator />

                <MenuItem href={config.links.help.index} target='_blank'>
                    <Icon name='help' />
                    {t.s('help')} {t.s('und')} {t.s('support').toLowerCase()}
                </MenuItem>

                <MenuItem href={config.links.blog} target='_blank'>
                    <Icon name='history' />
                    {t.s('blog')}
                </MenuItem>

                <MenuItem href={config.links.help.changelog} target='_blank'>
                    <Icon name='calendar' />
                    {t.s('whatsNew')}?
                </MenuItem>

                <MenuSeparator />

                <MenuItem onClick={logout}>
                    <Icon name='exit' />
                    {t.s('logOut')}
                </MenuItem>
            </Menu>
        </Popover>
    )
}

export default connect(
	(state)=>({
        user: user(state)
	}),
	{ logout }
)(UserProfileMenu)