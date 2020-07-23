import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { getSearchEmpty } from '~data/selectors/bookmarks'
import { makeCollection } from '~data/selectors/collections'

class BookmarksHeaderSelectModeTitle extends React.Component {
    static defaultProps = {
        selectMode: {}
    }

    render() {
        const { selectMode, collection, isSearching } = this.props

        return (
            <>
                {selectMode.all ? t.s('all') : selectMode.ids.length}&nbsp;
                {isSearching ? 
                    (t.s('found').toLowerCase()+' '+t.s('bookmarks')) :
                    (collection._id ? (t.s('in') + ' ' + collection.title) : '')
                }
            </>
        )
    }
}

export default connect(
	() => {
        const getCollection = makeCollection()
    
        return (state, { selectMode })=>({
            collection: getCollection(state, selectMode.spaceId),
            isSearching: !getSearchEmpty(state, selectMode.spaceId)
        })
    }
)(BookmarksHeaderSelectModeTitle)