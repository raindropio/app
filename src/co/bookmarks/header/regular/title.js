import React from 'react'
import { Link } from 'react-router-dom'
import t from '~t'
import { connect } from 'react-redux'
import { getSearchEmpty, makeCount } from '~data/selectors/bookmarks'
import { makeCollection } from '~data/selectors/collections'

class BookmarksHeaderTitle extends React.Component {
    static defaultProps = {
        spaceId: 0,
        compact: false,
    }

    renderTitle = ()=>{
        const {
            collection: { _id, title='' },
            isSearching,
            compact
        } = this.props

        if (!_id && isSearching)
            if (compact)
                return t.s('interest_other').toLowerCase() + ' ' + t.s('collectionsCount')
            else
                return title.toLowerCase()

        return title
    }

    render() {
        const { isSearching, compact, status, collection: { _id }, count } = this.props

        return isSearching ?
            (
                status.main == 'loading' ? 
                    '' :
                    `${count} ${t.s('bookmarks')} ${isSearching ? t.s('found').toLowerCase() : ''}`
            ) :
            (
                compact && status.main=='loaded' ? (
                    <Link to={`/my/${_id}/full`}>
                        {this.renderTitle()}
                    </Link>
                ) : this.renderTitle()
            )
    }
}

export default connect(
	() => {
        const getCollection = makeCollection()
        const getCount = makeCount()
    
        return (state, { spaceId })=>({
            collection: getCollection(state, spaceId),
            isSearching: !getSearchEmpty(state, spaceId),
            count: getCount(state, spaceId),
        })
    }
)(BookmarksHeaderTitle)