import s from './index.module.styl'
import React, { useMemo, useState, useEffect } from 'react'
import t from '~t'
import localStorage from '~modules/localStorage'

import { Title } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Item from './item'

const _hidekey = 'settings-integrations-ready-hide'

export default function SettingsIntegrationsReady() {
    const [hidden, hide] = useState(()=>localStorage.getItem(_hidekey) ? true : false)
    useEffect(()=>{
        if (hidden)
            localStorage.setItem(_hidekey, '1')
        else
            localStorage.removeItem(_hidekey)
    }, [hidden])

    const apps = useMemo(()=>[
        { title: 'Raycast Extension', href: 'https://www.raycast.com/lardissone/raindrop-io' },
        { title: 'Alfred Workflow', href: 'https://www.packal.org/workflow/search-raindropio', icon: 'alfred' },
    ], [])

    const webs = useMemo(()=>[
        { title: 'Send new bookmarks to Google Sheet', href: 'https://ifttt.com/applets/hn5RNTPp-log-new-items-in-raindrop-io-to-a-google-sheet', icon: 'google' },
        { title: 'Save favorite Youtube videos', href: 'https://ifttt.com/applets/DJyFrvNd-save-liked-youtube-video-to-raindrop-io', icon: 'youtube' },
        { title: 'Save favorite Tweets', href: 'https://ifttt.com/applets/zY5kqKtL-save-the-tweets-you-like-in-raindrop-io', icon: 'twitter' },
        { title: `${t.s('more')} 2000 ${t.s('integrations').toLowerCase()}…`, href: 'https://ifttt.com/raindrop', icon: 'open' }
    ], [])

    return (
        <>
            <Title>
                {t.s('staffPicks')} &nbsp;

                <Button onClick={()=>hide(!hidden)}>
                    <Icon name={hidden ? 'expand' : 'colapse'} size='micro' />
                </Button>
            </Title>

            {!hidden && (<>
                <div className={s.list}>
                    {apps.map((item, id)=>(
                        <Item key={id} {...item} />
                    ))}
                </div>

                <div className={s.list}>
                    {webs.map((item, id)=>(
                        <Item key={id} {...item} />
                    ))}
                </div>

                <br />
            </>)}
        </>
    )
}