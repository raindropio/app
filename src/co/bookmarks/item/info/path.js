import s from './path.module.styl'
import React from 'react'
import { connect } from 'react-redux'
import { collection } from '~data/selectors/collections'

import CollectionIcon from '~co/collections/item/icon'

class BookmarksItemPath extends React.Component {
    onClick = e => {
        e.preventDefault()
        this.props.onCollectionClick(this.props.collection)
    }

    render() {
        const { collection: { title } } = this.props

        return (
            <a 
                tabIndex='-1'
                href=''
                className={s.path}
                onClick={this.onClick}>
                <CollectionIcon 
                    {...this.props}
                    className={s.icon} />
                {title}
            </a>
        )
    }
}

export default connect(
	(state, { collectionId }) => ({
        collection: collection(state, collectionId)
    }),
	()=>({})
)(BookmarksItemPath)