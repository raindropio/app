import React from 'react'
import t from '~t'
import { parseDate } from './parse'

let _format
function getFormat() {
    if (!_format)
        _format = new Intl.DateTimeFormat(
            t.currentLang,
            {
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
    try{
        return getFormat()(parseDate(original))
    }catch(e){}

    return ''
}

export const LongDateTime = React.memo(
    function({ date }) {
        return longDateTime(date)
    }
)