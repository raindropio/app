import s from './header.module.styl'
import React from 'react'
import t from '~t'
import config from '~config'
import { connect } from 'react-redux'
import { getDraftStatus } from '~data/selectors/bookmarks'

import LogoIcon from '~assets/brand/icon_raw.svg?component'
import Header, { FirstAction, Space, Title } from '~co/common/header'
import Button from '~co/common/button'
import { Button as ProfileButton } from '~co/user/profile'

function ClipperHeader({ status }) {
    let title = ''

    switch(status) {
        case 'new':     title = t.s('newBookmark'); break
        case 'idle':    title = ''; break
        case 'loading': title = ''; break
        case 'removed': title = t.s('removeSuccess'); break
        default:        title = t.s('bookmark')+' '+t.s('saved').toLowerCase(); break
    }

    return (
        <Header>
            <Button
                as='a'
                href={config.links.app.index}
                target='_blank'
                title='Raindrop.io'>
                <LogoIcon className={s.logo} />
            </Button>

            <Title className={s.title}>{title}</Title>

            <Space />

            
            <FirstAction>
            <ProfileButton />

            </FirstAction>
        </Header>
    )
}

export default connect(
    (state, { item })=>{
        return {
            status: getDraftStatus(state, item.link),
        }
    }
)(ClipperHeader)