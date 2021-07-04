import s from './cache.module.styl'
import React from 'react'
import t from '~t'
import { API_ENDPOINT_URL } from '~data/constants/app'

import Header, { Title, Space } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import SuperFrame from '~co/common/superFrame'

const invalidStatus = {
    'invalid-origin': 'Origin is unreachable.',
    'invalid-size': 'Page size too large.',
    'invalid-timeout': 'Timeout.'
}

function CacheStatus({ cache, url }) {
    let icon = '', title = ''

    switch(cache) {
        case 'ready':
            icon = 'ready'
            title = t.s('permanentCopy') + ' ' + t.s('saved').toLowerCase()
        break

        case 'retry':
            icon = 'retry'
            title = t.s('permanentCopy') + ' ' + t.s('uploadProgress').toLowerCase()
        break

        default:
            icon = 'failed'
            title = <>{t.s('supportOnlyUrls')} <b>{invalidStatus[cache]}</b></>
        break
    }

    return (
        <Header className={s.status} data-status={cache}>
            {icon && <Icon name={'cache_'+icon} className={s.icon} />}
            <Title>{title}</Title>
            <Space />

            {cache == 'ready' && (
                <>
                    <Button 
                        href={url}
                        rel='noopener'
                        target='_blank'>
                        <Icon name='open' size='micro' />
                        {t.s('open')}
                    </Button>

                    <Button href={url+'?download'}>
                        <Icon name='document' size='micro' />
                        {t.s('download')}
                    </Button>
                </>
            )}
        </Header>
    )
}

export default function ReaderCache({ item: { cache, _id } }) {
    const url = `${API_ENDPOINT_URL}raindrop/${_id}/cache`

    switch(cache) {
        case 'ready':
            return (
                <div className={s.cache}>
                    <CacheStatus cache={cache} url={url} />
                    <SuperFrame className={s.frame} src={url} />
                </div>
            )
        
        default:
            return <CacheStatus cache={cache} url={url} />
    }
}