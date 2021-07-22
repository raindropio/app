import s from './tip.module.styl'
import React from 'react'
import t from '~t'
import { Section } from '~co/common/list'

export default function SearchMenuSuggestionsTip({ suggestions, value }) {
    if (!suggestions.length)
        return null

    if (suggestions[0].query?.startsWith('created'))
        return (<Section className={s.tip}>{t.s('dateSearchD')}</Section>)

    if (suggestions[0]._id != 'current')
        return (<Section>{value ? t.s('narrowSearch') : t.s('suggested')}</Section>)

    return null
}