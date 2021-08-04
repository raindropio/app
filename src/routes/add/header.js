import s from './header.module.styl'
import React, { useMemo } from 'react'
import t from '~t'
import config from '~config'
import { useSelector } from 'react-redux'
import { makeDraftStatus } from '~data/selectors/bookmarks'

import { Helmet } from 'react-helmet'
import LogoIcon from '~assets/brand/icon_raw.svg?component'
import Header, { Title, FirstAction, Space } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import { Button as ProfileButton } from '~co/user/profile'

export default ({ item })=>{
    const getDraftStatus = useMemo(()=>makeDraftStatus(), [])
    const status = useSelector(state=>getDraftStatus(state, item.link))

    let title = ''

    switch(status) {
        case 'new':     title = t.s('newBookmark'); break
        case 'idle':    title = ''; break
        case 'loading': title = ''; break
        default:        title = t.s('bookmark')+' '+t.s('saved').toLowerCase(); break
    }

    return (
        <Header
            data-no-shadow
            data-fancy>
            <Helmet><title>{title}</title></Helmet>

            <FirstAction>
                <Button
                    as='a'
                    href={config.links.app.index}
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