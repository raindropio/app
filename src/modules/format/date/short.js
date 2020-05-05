import React from 'react'
import t from '~t'
import isToday from 'date-fns/isToday'
import isThisYear from 'date-fns/isThisYear'
import { parseDate } from './parse'

export const shortDate = (original) => {
    try{
        const d = parseDate(original)

        if (isToday(d))
            return t.s('today')+', '+new Intl.DateTimeFormat(
                t.currentLang,
                { hour: 'numeric', minute: 'numeric' }
            ).format(d)

        return new Intl.DateTimeFormat(
            t.currentLang,
            {
                ...(!isThisYear(d) ? {year: 'numeric'} : {}),
                month: 'short',
                day: 'numeric',
            }
        ).format(d)
    }catch(e){}

    return ''
}

export const ShortDate = React.memo(
    function({ date }) {
        return shortDate(date)
    }
)