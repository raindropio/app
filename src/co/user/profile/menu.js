import React from 'react'
import t from '~t'
import config from '~config'
import { connect } from 'react-redux'
import { logout } from '~data/actions/user'
import { user } from '~data/selectors/user'
import { target } from '~target'

import Popover, { Menu, MenuItem, MenuSeparator } from '~co/overlay/popover'
import Icon from '~co/common/icon'

function UserProfileMenu({
    pin,
    onClose,

    logout
}) {
    return (
        <Popover pin={pin} onClose={onClose}>
            <Menu>
                <MenuItem to='/settings'>
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

                <MenuItem href={config.links.download} target='_blank'>
                    <Icon name='install' />
                    {t.s('download')} {t.s('app').toLowerCase()}
                </MenuItem>

                <MenuSeparator />

                <MenuItem href={config.links.help.index} target='_blank'>
                    <Icon name='help' />
                    {t.s('help')} {t.s('und')} {t.s('support').toLowerCase()}
                </MenuItem>

                <MenuItem href={config.links.help.changelog} target='_blank'>
                    <Icon name='history' />
                    {t.s('whatsNew')}?
                </MenuItem>

                <MenuItem href={config.links.better} target='_blank'>
                    <Icon name='like' />
                    {t.s('pro_nextFeatures')}
                </MenuItem>

                <MenuItem href={config.links.twitter} target='_blank'>
                    <Icon name='twitter_outline' />
                    Twitter
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