import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Edit from '~co/bookmarks/edit'

export default function PageMyItemTabEdit({ item: { _id } }) {
    const [ searchParams ] = useSearchParams()

    return (
        <Edit 
            _id={_id}
            autoFocus={searchParams.get('autoFocus')} />
    )
}