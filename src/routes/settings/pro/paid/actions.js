import s from './actions.module.styl'
import React from 'react'
import t from '~t'
import config from '~config'

import { Label } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function ProActions({ subscription: { links={}, status } }) {
    return (
        <>
            <Label>{t.s('manage')}</Label>

            <div className={s.actions}>
                {links.manage ? (
                    <Button
                        autoFocus
                        variant='primary'
                        href={links.manage}
                        target='_blank'>
                        <Icon name='user' size='micro' />
                        {t.s('change')} {t.s('subscription').toLowerCase()}
                    </Button>
                ) : null}

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
            </div>
        </>
    )
}