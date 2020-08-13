import s from './help.module.styl'
import React from 'react'
import t from '~t'
import config from '~config'

import { Label } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function ProHelp() {
    return (
        <>
            <Label>{t.s('info')}</Label>
            <div className={s.help}>
                <Button
                    href={config.links.pro.compare}
                    target='_blank'>
                    <Icon name='cloud' size='micro' />
                    {t.s('all')} {t.s('features').toLowerCase()}
                </Button>

                <Button
                    href={config.links.pro.buy}
                    target='_blank'>
                    <Icon name='list' size='micro' />
                    {t.s('comparePlans')}
                </Button>

                <Button
                    href={config.links.pro.faq}
                    target='_blank'>
                    <Icon name='open' size='micro' />
                    FAQ
                </Button>
            </div>
        </>
    )
}