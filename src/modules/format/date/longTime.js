import React from 'react'
import { parseDate } from './parse'
import dateFnsFormat from 'date-fns/format'

let _format
function getFormat() {
    if (!_format)
        _format = new Intl.DateTimeFormat(
            undefined,
            {
                hour12: new Date().toLocaleTimeString().toString().match(/am|pm/i) ? true : false,
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            }
        ).format

    return _format
}

export const longDateTime = (original) => {
    let d
    try{ d = parseDate(original) } catch(e){}

    try{
        return getFormat()(d)
    }catch(e){}

    try{
        return dateFnsFormat(d, 'P p')
    }catch(e){}

    return ''
}

export const LongDateTime = React.memo(
    function({ date }) {
        return longDateTime(date)
    }
)