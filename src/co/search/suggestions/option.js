import s from './option.module.styl'
import React from 'react'
import t from '~t'
import { Checkbox } from '~co/common/form'

let labels
function getLabel({ query }) {
    if (!labels)
        labels = {
            'fulltext:true': t.s('fullTextSearch')
        }
    return labels[query.trim()] || query
}

export default function SuggestionsOption({ item, className='', active, ...etc }) {
    return (
        <div className={s.option+' '+className+' '+(active?s.active:'')} {...etc}>
            <Checkbox checked={item.checked}>
                {getLabel(item)}
            </Checkbox>
        </div>
    )
}