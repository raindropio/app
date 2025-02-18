import React from 'react'
import { parseDate } from './parse'
import dateFnsFormat from 'date-fns/format'

let _format
function getFormat() {
    if (!_format)
        _format = new Intl.DateTimeFormat(
            undefined,
            {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            }
        ).format

    return _format
}

export const numericDate = (original) => {
    let d
    try{ d = parseDate(original) } catch(e){}
    
    try{
        return getFormat()(d)
    }catch(e){}

    try{
        return dateFnsFormat(d, 'P')
    }catch(e){}

    return ''
}

export const NumericDate = React.memo(
    function({ date }) {
        return numericDate(date)
    }
)