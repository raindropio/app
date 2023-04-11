import s from './reminder.module.styl'
import React from 'react'
import { ShortDateTime } from '~modules/format/date'
import Icon from '~co/common/icon'

export default function BookmarksItemReminder({ reminder }) {
    if (reminder?.date)
        return (
            <div className={s.reminder}>
                <Icon name='reminder' size='micro' />
                {' '}
                <ShortDateTime date={reminder.date} />
            </div>
        )

    return null
}