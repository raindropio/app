import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { getSearchEmpty } from '~data/selectors/bookmarks'
import { makeCollection } from '~data/selectors/collections'

class BookmarksHeaderTitle extends React.Component {
    static defaultProps = {
        spaceId: 0,
        compact: false
    }

    onTitleClick = e =>{
        e.preventDefault()
        this.props.events.onCollectionClick(this.props.collection)
    }

    renderSearchStatus = ()=>{
        const { status } = this.props

        switch(status.main) {
            case 'empty':   return t.s('nothingFound')
            case 'loading': return t.s('defaultCollection-0')
            default:        return t.s('found')
        }
    }

    renderTitle = ()=>{
        const {
            collection: { _id, title },
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
        const { isSearching, compact, status } = this.props

        return (
            <>
                {isSearching && (
                    <>
                        {this.renderSearchStatus()}&nbsp;
                        {t.s('in')}&nbsp;
                    </>
                )}

                {compact && status.main=='loaded' ? (
                    <a href='' onClick={this.onTitleClick}>
                        {this.renderTitle()}
                    </a>
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