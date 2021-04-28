import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { makeCollection } from '~data/selectors/collections'

import Enable from './enable'
import Link from './link'
import Customization from './customization'
import Footer from './footer'

export default function CollectionSharingPublic({ _id }) {
    const getCollection = useMemo(makeCollection, [])
    const collection = useSelector(state=>getCollection(state, _id))

    return (
        <div>
            <Enable collection={collection} />
            <Link collection={collection} />
            <Customization collection={collection} />
            <Footer collection={collection} />
        </div>
    )
}