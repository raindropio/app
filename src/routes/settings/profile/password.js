import React from 'react'
import t from '~t'

import { Label, Text } from '~co/common/form'

function SettingsProfilePassword() {
    return (
        <>
            <Label>{t.s('currentPassword')}</Label>
            <Text />

            <Label>{t.s('newPassword')}</Label>
            <Text />
        </>
    )
}

export default SettingsProfilePassword