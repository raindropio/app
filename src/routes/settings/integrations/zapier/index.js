import s from './index.module.styl'
import React from 'react'
import t from '~t'

import { Label } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function SettingsIntegrationsZapier() {
    return (
        <>
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