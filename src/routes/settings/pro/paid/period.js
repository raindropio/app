import s from './period.module.styl'
import React from 'react'
import t from '~t'
import { LongDate } from '~modules/format/date'
import { Label } from '~co/common/form'

export default function ProPeriod({ subscription: { stopAt, renewAt } }) {
    if (stopAt)
        return (
            <>
                <Label>{t.s('willStop')}</Label>
                <div className={s.period}>
                    <LongDate date={stopAt} />
                </div>
            </>
        )

        return (
            <>
                <Label>{t.s('next')} {t.s('payment').toLowerCase()}</Label>
                <div className={s.period}>
                    {renewAt && <LongDate date={renewAt} />}
                </div>
            </>
        )
}