import React from 'react'
import t from '~t'
import isToday from 'date-fns/isToday'
import isThisYear from 'date-fns/isThisYear'
import { parseDate } from './parse'

let _formats = {}
function getFormat(type) {
    if (!_formats[type]){
        let params = {}

        switch (type) {
            case 'time':    params = { hour: 'numeric', minute: 'numeric' }; break;
            case 'compact': params = { month: 'short', day: 'numeric' }; break;
            default:        params = { year: 'numeric', month: 'short', day: 'numeric' }; break;
        }

        _formats[type] = new Intl.DateTimeFormat(t.currentLang, params).format
    }

    return _formats[type]
}

export const shortDate = (original) => {
    try{
        const d = parseDate(original)

        if (isToday(d))
            return t.s('today')+', '+getFormat('time')(d)

        return getFormat(!isThisYear(d) ? 'full' : 'compact')(d)
    }catch(e){}

    return ''
}

export const ShortDate = React.memo(
    function({ date }) {
        return shortDate(date)
    }
)