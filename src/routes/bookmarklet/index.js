import React from 'react'
import t from '~t'

import LogoIcon from '~assets/images/icons/icon_raw.svg?component'
import Protected from '~co/screen/protected'
import Screen from '~co/screen/basic'
import Header, { Title } from '~co/common/header'

export default ({ match })=>(
    <Protected redirect>
        <Screen>
            <Header>
                <LogoIcon />
                <Title>{t.s('addBookmark')}</Title>
            </Header>
        </Screen>
    </Protected>
)