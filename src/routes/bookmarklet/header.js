import s from './header.module.styl'
import React from 'react'
import t from '~t'
import config from '~config'

import LogoIcon from '~assets/images/icons/icon_raw.svg?component'
import Header, { Title, FirstAction, Space } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default ()=>(
    <Header>
        <FirstAction>
            <Button
                as='a'
                href={config.links.app}
                target='_blank'
                title='Raindrop.io'>
                <LogoIcon className={s.logo} />
            </Button>
        </FirstAction>

        <Title>{t.s('addBookmark')}</Title>

        <Space />

        <Button onClick={window.close}>
            <Icon name='close' />
        </Button>
    </Header>
)