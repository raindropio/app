import s from './actions.module.styl'
import React from 'react'
import t from '~t'
import config from '~config'

import { Label } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function ProActions({ subscription: { links={}, plan } }) {
    let actions = null

    if (plan == 'legacy')
        actions = (
            <Button
                variant='primary'
                href={config.links.pro.buy}
                target='_blank'>
                <Icon name='progress' size='micro' />
                {t.s('renewPro')}
            </Button>
        )
    else
        actions = (
            <>
                <Button
                    autoFocus
                    variant='primary'
                    href={links.manage}
                    target='_blank'>
                    <Icon name='user' size='micro' />
                    {t.s('change')} {t.s('subscription').toLowerCase()}
                </Button>

                <Button
                    href={config.links.pro['help-change-billing-cycle']}
                    target='_blank'>
                    <Icon name='calendar' size='micro' />
                    {t.s('change')} {t.s('billingCycle').toLowerCase()}
                </Button>

                {links.payments && (
                    <Button
                        href={links.payments}
                        target='_blank'>
                        <Icon name='document' size='micro' />
                        Invoices
                    </Button>
                )}
            </>
        )

    return (
        <>
            <Label>{t.s('manage')}</Label>

            <div className={s.actions}>
                {actions}
            </div>
        </>
    )
}