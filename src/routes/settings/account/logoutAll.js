import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { logout } from '~data/actions/user'

import Button from '~co/common/button'

function SettingsProfileLogoutAll({ logout }) {
    return (
        <Button 
            onClick={()=>logout(true)}
            variant='link'
            accent='link'>
            {t.s('logOutOfAllDevices')}
        </Button>
    )
}

export default connect(
	undefined,
	{ logout }
)(SettingsProfileLogoutAll)