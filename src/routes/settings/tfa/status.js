import React from 'react'
import { useSelector } from 'react-redux'
import { user } from '~data/selectors/user'

import Alert from '~co/common/alert'

export default function SettingsTfaStatus() {
    const { tfa: { enabled } } = useSelector(user)

    return enabled ? (
        <Alert variant='success'>
            Two-Factor Authentication is Enabled
        </Alert>
    ) : (
        <Alert>
            Two-factor authentication (2FA) allows user account owners to add an additional layer of login security to Raindrop.io accounts.
        </Alert>
    )
}