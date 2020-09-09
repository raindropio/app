import s from './header.module.styl'
import React from 'react'
import t from '~t'
import config from '~config'

import { Helmet } from 'react-helmet'
import LogoIcon from '~assets/images/icons/icon_raw.svg?component'
import Header, { Title, FirstAction, Space } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import { Button as ProfileButton } from '~co/user/profile'

export default ({ status })=>{
    let title = ''

    switch(status) {
        case 'new':     title = t.s('newBookmark'); break
        case 'loading': title = t.s('loading')+'…'; break
        default:        title = t.s('edit')+' '+t.s('bookmark').toLowerCase(); break
    }

    return (
        <Header
            data-fancy
            data-no-shadow>
            <Helmet><title>{title}</title></Helmet>

            <FirstAction>
                <Button
                    as='a'
                    href={config.links.app}
                    target='_blank'
                    title='Raindrop.io'>
                    <LogoIcon className={s.logo} />
                </Button>
            </FirstAction>
    
            <Title>{title}</Title>
    
            <Space />

            <ProfileButton />
    
            <Button onClick={window.close}>
                <Icon name='close' />
            </Button>
        </Header>
    )
}