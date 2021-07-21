import React, { useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeCollection } from '~data/selectors/collections'
import { set } from '~data/actions/config'
import t from '~t'

import { Layout, Checkbox } from '~co/common/form'

export default function SearchMenuInCollection({ spaceId, originalSpaceId, value }) {
    const dispatch = useDispatch()

    const getCollection = useMemo(()=>makeCollection(), [])
    const collection = useSelector(state=>getCollection(state, originalSpaceId))

    const onChange = useCallback(e=>{
        e.preventDefault()
        dispatch(set('raindrops_search_incollection', e.target.checked))
    }, [])

    if (value || !parseInt(originalSpaceId))
        return null

    return (
        <Layout>
            <Checkbox
                key={spaceId == originalSpaceId}
                checked={spaceId == originalSpaceId}
                onChange={onChange}>
                {t.s('only')} {t.s('in')} "{collection.title}"
            </Checkbox>
        </Layout>
    )
}