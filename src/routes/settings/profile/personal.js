import React from 'react'
import t from '~t'

import { Label, Text } from '~co/common/form'

function SettingsProfilePersonal() {
    return (
        <>
            <Label>{t.s('name')}</Label>
            <Text autoFocus />

            <Label>Email</Label>
            <Text />
        </>
    )
}

export default SettingsProfilePersonal