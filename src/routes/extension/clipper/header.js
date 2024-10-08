import s from './header.module.styl'
import React from 'react'
import t from '~t'
import config from '~config'
import { connect } from 'react-redux'
import { getDraftStatus, getDraftItem } from '~data/selectors/bookmarks'
import isThisMinute from 'date-fns/isThisMinute'
import parseISO from 'date-fns/parseISO'

import LogoIcon from '~assets/brand/icon_raw.svg?component'
import Header, { Space, Title } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import { Button as ProfileButton } from '~co/user/profile'

function ClipperHeader({ status, item }) {
    let title = ''

    switch(status) {
        case 'new':     title = t.s('newString'); break
        case 'idle':    title = ''; break
        case 'loading': title = ''; break
        case 'removed': title = t.s('removeSuccess'); break
        default: {
            let isNowSaved = false;
            try { isNowSaved = isThisMinute(parseISO(item.created), new Date()) } catch(e){console.log(e)}
            title = isNowSaved ? t.s('saved') : t.s('edit')
        }
        break
    }

    const collectionPath = `/my/${status=='new' ? 0 : item.collectionId}`

    return (
        <Header data-no-shadow data-static>
            <Button
                as='a'
                href={config.links.app.index+collectionPath}
                target='_blank'
                title='Raindrop.io'>
                <LogoIcon className={s.logo} />
            </Button>

            <Title className={s.title}>{title}</Title>

            <Space />

            <Button
                as='a'
                href={`#${collectionPath}`}
                title={t.s('defaultCollection-0')}>
                <Icon name='search' />
            </Button>

            <ProfileButton />
        </Header>
    )
}

export default connect(
    (state, { item })=>{
        return {
            status: getDraftStatus(state, item.link),
            item: getDraftItem(state, item.link),
        }
    }
)(ClipperHeader)