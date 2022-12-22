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
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            }
        ).format

    return _format
}

export const shortDateTime = (original) => {
    try{
        return getFormat()(parseDate(original))
    }catch(e){}

    return ''
}

export const ShortDateTime = React.memo(
    function({ date }) {
        return shortDateTime(date)
    }
)