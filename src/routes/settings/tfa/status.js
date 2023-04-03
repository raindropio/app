import React from 'react'
import t from '~t'
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
            {t.s('tfaD')}
        </Alert>
    )
}