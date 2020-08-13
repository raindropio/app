import s from './index.module.styl'
import React from 'react'
import t from '~t'
import config from '~config'

import { Label, Title } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function SettingsIntegrationsReady() {
    return (
        <>
            <Title>{t.s('integrations')}</Title>

            <Label>
                {t.s('staffPicks')}
            </Label>

            <div className={s.buttons}>
                <Button
                    href='https://www.packal.org/workflow/search-raindropio'
                    target='_blank'>
                    <Icon name='alfred' />
                    Alfred Workflow
                </Button>
            </div>

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

            <Label>
                Zapier
            </Label>

            <div className={s.buttons}>
                <Button
                    href='https://zapier.com/apps/github/integrations/raindropio/231017/create-new-global-events-in-github-as-raindropio-items'
                    target='_blank'>
                    <Icon name='github' />
                    Save favorite Github repos
                </Button>

                <Button
                    href='https://zapier.com/apps/raindropio/integrations/slack/110589/save-new-links-from-slack-messages-to-raindropio'
                    target='_blank'>
                    <Icon name='slack' />
                    Save favorite Slack links
                </Button>

                <Button
                    href='https://zapier.com/apps/raindropio/integrations/rss/205642/save-new-rss-items-to-raindropio'
                    target='_blank'>
                    <Icon name='rss' />
                    Save RSS
                </Button>

                <Button
                    href={config.links.help.zapier}
                    target='_blank'
                    variant='link'>
                    <Icon name='open' size='micro' />
                    {t.s('howToUse')}
                </Button>

                <Button
                    href='https://zapier.com/apps/raindropio'
                    target='_blank'
                    variant='link'>
                    <Icon name='open' size='micro' />
                    {t.s('more')} Zapier {t.s('integrations').toLowerCase()}…
                </Button>
            </div>
        </>
    )
}