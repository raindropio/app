import s from './path.module.styl'
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { collection } from '~data/selectors/collections'

import CollectionIcon from '~co/collections/item/icon'

function BookmarksItemPath({ collection, getLink }) {
    return (
        <Link 
            tabIndex='-1'
            to={getLink({ _id: collection._id, refine:'', full: true })}
            className={s.path}>
            <CollectionIcon 
                {...collection}
                className={s.icon} />
            {collection.title}
        </Link>
    )
}

export default connect(
	(state, { collectionId }) => ({
        collection: collection(state, collectionId)
    }),
	()=>({})
)(BookmarksItemPath)