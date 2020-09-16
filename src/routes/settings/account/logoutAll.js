import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { logout } from '~data/actions/user'

import { Buttons } from '~co/common/form'
import Button from '~co/common/button'

function SettingsProfileLogoutAll({ logout }) {
    return (
        <Buttons>
            <Button 
                onClick={()=>logout(true)}
                variant='link'
                accent='link'>
                {t.s('logOutOfAllDevices')}
            </Button>
        </Buttons>
    )
}

export default connect(
	undefined,
	{ logout }
)(SettingsProfileLogoutAll)