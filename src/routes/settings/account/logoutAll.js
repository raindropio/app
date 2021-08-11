import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { logout } from '~data/actions/user'

import { Item, ItemTitle, ItemIcon, ItemLink } from '~co/common/list'
import Icon from '~co/common/icon'

function SettingsProfileLogoutAll({ logout }) {
    return (
        <>
            <Item>
                <ItemIcon><Icon name='exit' /></ItemIcon>
                <ItemTitle>{t.s('logOut')}</ItemTitle>
                <ItemLink onClick={()=>logout()} />
            </Item>

            <Item>
                <ItemIcon><Icon name='exit' /></ItemIcon>
                <ItemTitle>{t.s('logOutOfAllDevices')}</ItemTitle>
                <ItemLink onClick={()=>logout(true)} />
            </Item>
        </>
    )
}

export default connect(
	undefined,
	{ logout }
)(SettingsProfileLogoutAll)