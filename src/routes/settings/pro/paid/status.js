import s from './status.module.styl'
import React from 'react'
import t from '~t'

import { Label } from '~co/common/form'
import Preloader from '~co/common/preloader'
import Icon from '~co/common/icon'

export default function ProStatus({ subscription: { status='', plan='', loading } }) {
    let label = ''
    let icon = <Icon name='diamond_active' className={s.icon+' '+s[status]} />
    let period

    //status
    if (loading){
        icon = <Preloader />
        label = t.s('loading')+'…'
    }
    else
        switch(status) {
            case 'payment_failed': label = 'Payment failed'; break
            default: label = t.s(status); break
        }

    //plan
    if (plan.includes('monthly'))
        period = ` (${t.s('monthly')})`
    else if (plan.includes('annual'))
        period = ` (${t.s('yearly')})`

    return (
        <>
            <Label>{t.s('subscription')}</Label>
            
            <div className={s.status}>
                {icon}
                {label}
                {period}
            </div>
        </>
    )
}