import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { collection } from '~data/selectors/collections'

import CollectionIcon from '~co/collections/item/icon'

class BookmarksItemPath extends React.Component {
    render() {
        const { _id, title } = this.props

        return (
            <Link to={`/collection/${_id}full`} className='info info-path'>
                <span className='info-img'>
                    <CollectionIcon {...this.props} size='16' />
                </span>
                <span className='info-path-title'>
                    {title}
                </span>
            </Link>
        )
    }
}

export default connect(
	(state, { collectionId }) => collection(state, collectionId),
	()=>({})
)(BookmarksItemPath)