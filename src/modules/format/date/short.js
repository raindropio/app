import t from '~t'
import format from 'date-fns/format'
import isToday from 'date-fns/isToday'
import isThisYear from 'date-fns/isThisYear'
import { parseDate } from './parse'

export const shortDate = (d, options={}) => {
    if (!d) return ''

    const date = parseDate(d)
    const { time=true } = options

    return format(
        date,
        isThisYear(date) ? 
            (!isToday(date) ? 'MMM d, ' : '') + (time ? 'p' : '') :
            'PP',
        { locale: t.datelocale }
    )
}