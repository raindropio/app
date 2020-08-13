import s from './index.module.styl'
import React from 'react'
import t from '~t'

import { Label } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function SettingsIntegrationsIFTTT() {
    return (
        <>
            <Label>
                IFTTT
            </Label>

            <div className={s.buttons}>
                <Button
                    href='https://ifttt.com/applets/hn5RNTPp-log-new-items-in-raindrop-io-to-a-google-sheet'
                    target='_blank'>
                    <Icon name='google' />
                    Send new bookmarks to Google Sheet
                </Button>

                <Button
                    href='https://ifttt.com/applets/DJyFrvNd-save-liked-youtube-video-to-raindrop-io'
                    target='_blank'>
                    <Icon name='youtube' />
                    Save favorite Youtube videos
                </Button>

                <Button
                    href='https://ifttt.com/applets/zY5kqKtL-save-the-tweets-you-like-in-raindrop-io'
                    target='_blank'>
                    <Icon name='twitter' />
                    Save favorite Tweets
                </Button>

                <Button
                    href='https://ifttt.com/raindrop'
                    target='_blank'
                    variant='link'>
                    <Icon name='open' size='micro' />
                    {t.s('more')} IFTTT {t.s('integrations').toLowerCase()}…
                </Button>
            </div>
        </>
    )
}