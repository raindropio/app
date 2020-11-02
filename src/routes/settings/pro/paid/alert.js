import s from './alert.module.styl'
import React from 'react'
import Alert from '~co/common/alert'
import { LongDate } from '~modules/format/date'

export default function ProAlert({ subscription: { status, stopAt } }) {
    switch(status) {
        case 'canceled':
            return (
                <Alert 
                    className={s.alert}
                    variant='warning'>
                    Your subscription has been <b>canceled</b>, but is active through <LongDate date={stopAt}/><br /><br />
                    You'll still be able to take advantage of PRO plan through this date,
                    but you will not be charged a subscription fee moving forward.
                </Alert>
            )

        case 'payment_failed':
            return (
                <Alert 
                    className={s.alert}
                    variant='danger'>
                    We attempted to charge the card you have on file but were unable to do so.<br/>
                    We will automatically attempt to charge your card again within 24-48 hours.
                </Alert>
            )

        default:
            return null
    }
}