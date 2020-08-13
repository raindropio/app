import React from 'react'
import t from '~t'
import { parseDate } from './parse'

export const longDate = (original) => {
    try{
        return new Intl.DateTimeFormat(
            t.currentLang,
            {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }
        ).format(parseDate(original))
    }catch(e){}

    return ''
}

export const LongDate = React.memo(
    function({ date }) {
        return longDate(date)
    }
)