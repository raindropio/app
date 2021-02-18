import React from 'react'
import { Link } from 'react-router-dom'
import t from '~t'
import { connect } from 'react-redux'
import { getSearchEmpty } from '~data/selectors/bookmarks'
import { makeCollection } from '~data/selectors/collections'

class BookmarksHeaderTitle extends React.Component {
    static defaultProps = {
        spaceId: 0,
        compact: false,
        getLink: undefined
    }

    renderSearchStatus = ()=>{
        const { status } = this.props

        switch(status.main) {
            case 'empty':   return t.s('nothingFound')
            default:        return t.s('defaultCollection-0')
        }
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
        const { isSearching, compact, status, collection: { _id }, getLink } = this.props

        return (
            <>
                {isSearching && (
                    <>
                        {this.renderSearchStatus()}&nbsp;
                        {t.s('in')}&nbsp;
                    </>
                )}

                {compact && status.main=='loaded' ? (
                    <Link to={getLink({ _id, full:true, refine: '' })}>
                        {this.renderTitle()}
                    </Link>
                ) : this.renderTitle()}
            </>
        )
    }
}

export default connect(
	() => {
        const getCollection = makeCollection()
    
        return (state, { spaceId })=>({
            collection: getCollection(state, spaceId),
            isSearching: !getSearchEmpty(state, spaceId)
        })
    }
)(BookmarksHeaderTitle)