import React from 'react'
import t from '~t'

export default function FiltersItemTitle({ _id }) {
    switch (_id) {
        case 'important':
            return t.s('favorites')

        case 'notag':
            return t.s('noTags')

        case 'broken':
            return t.s(_id)

        default:
            return t.s(_id+'s')
    }
}