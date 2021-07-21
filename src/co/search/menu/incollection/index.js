import React, { useCallback } from 'react'
import _ from 'lodash-es'
import { useDispatch } from 'react-redux'
import { set } from '~data/actions/config'
import t from '~t'

import { Layout, Checkbox } from '~co/common/form'

export default function SearchMenuInCollection({ spaceId, originalSpaceId, value }) {
    const dispatch = useDispatch()

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
                {_.capitalize(t.s('in'))} {t.s('currentCollection').toLowerCase()}
            </Checkbox>
        </Layout>
    )
}