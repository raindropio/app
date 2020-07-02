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
            <span className={selectMode.all ? 'selected-all-badge' : ''}>
                {selectMode.all ? t.s('all') : selectMode.ids.length}&nbsp;
                {t.s('found').toLowerCase()} {t.s('bookmarks')}
            </span>
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