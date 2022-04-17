import React, { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { makeCollection } from '~data/selectors/collections'
import Add from '~co/bookmarks/add'

export default function PageMySpaceHeaderAdd({ cId, search }) {
    const navigate = useNavigate()

    const getCollection = useMemo(makeCollection, [])
    const { access } = useSelector(state=>getCollection(state, cId))

    const onEdit = useCallback(item=>(
        navigate(`../../${item.collectionId}/item/${item._id}/edit`)
    ), [])

    if (cId == -99 || !access || access.level < 3)
        return null

    return (
        <Add 
            autoFocus={true}
            spaceId={cId}
            search={search}
            onEdit={onEdit} />
    )
}