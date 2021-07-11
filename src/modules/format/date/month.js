import React from 'react'
import t from '~t'
import { parseDate } from './parse'
import dateFnsFormat from 'date-fns/format'

let _format
function getFormat() {
    if (!_format)
        _format = new Intl.DateTimeFormat(
            t.currentLang,
            {
                year: 'numeric',
                month: 'long',
            }
        ).format

    return _format
}

export const monthDate = (original) => {
    let d
    try{ d = parseDate(original) } catch(e){}

    try{
        return getFormat()(d)
    }catch(e){}

    try{
        return dateFnsFormat(d, 'MMMM yyyy')
    }catch(e){}

    return ''
}

export const MonthDate = React.memo(
    function({ date }) {
        return monthDate(date)
    }
)