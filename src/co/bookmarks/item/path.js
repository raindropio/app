import s from './path.module.styl'
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { collection } from '~data/selectors/collections'

import CollectionIcon from '~co/collections/item/icon'

class BookmarksItemPath extends React.Component {
    render() {
        const { _id, title } = this.props

        return (
            <Link to={`/space/${_id}`} tabIndex='-1' className={s.path}>
                <CollectionIcon 
                    {...this.props}
                    className={s.icon} />
                {title}
            </Link>
        )
    }
}

export default connect(
	(state, { collectionId }) => collection(state, collectionId),
	()=>({})
)(BookmarksItemPath)