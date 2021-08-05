import s from './index.module.styl'
import React from 'react'
import config from '~config'

import LogoIcon from '~assets/brand/icon_raw.svg?component'
import Header, { FirstAction, Space } from '~co/common/header'
import Button from '~co/common/button'
import { Button as ProfileButton } from '~co/user/profile'
import Title from './title'
import Close from './close'

export default (props)=>{
    return (
        <Header
            data-no-shadow
            data-fancy>
            <FirstAction>
                <Button
                    as='a'
                    href={config.links.app.index}
                    target='_blank'
                    title='Raindrop.io'>
                    <LogoIcon className={s.logo} />
                </Button>
            </FirstAction>
    
            <Title {...props} />
    
            <Space />

            <ProfileButton />
    
            <Close {...props} />
        </Header>
    )
}