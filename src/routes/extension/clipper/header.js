import s from './header.module.styl'
import React from 'react'
import config from '~config'

import LogoIcon from '~assets/brand/icon_raw.svg?component'
import Header, { FirstAction, Space } from '~co/common/header'
import Button from '~co/common/button'
import { Button as ProfileButton } from '~co/user/profile'

export default ()=>{
    return (
        <Header
            data-fancy
            data-no-shadow>
            <ProfileButton />
            
    
            <Space />

            <FirstAction>
                <Button
                    as='a'
                    href={config.links.app}
                    target='_blank'
                    title='Raindrop.io'>
                    <LogoIcon className={s.logo} />
                </Button>
            </FirstAction>
        </Header>
    )
}