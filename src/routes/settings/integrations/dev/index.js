import s from './index.module.styl'
import React from 'react'
import t from '~t'

import { Label, Separator, Title } from '~co/common/form'
import My from './my'
import New from './new'
import Help from './help'

export default function SettingsIntegrationsDev() {
    return (
        <>
            <Title>{t.s('interest_developers')}</Title>

            <Label>{t.s('my')}</Label>
            <div className={s.list}>
                <My />
                <New />
            </div>

            <Help />

            <Separator />
        </>
    )
}