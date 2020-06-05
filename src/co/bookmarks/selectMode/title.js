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
            <div className='title'>
                <span className={selectMode.all ? 'selected-all-badge' : ''}>
                    {selectMode.all ? t.s('all') : selectMode.ids.length} {
                        collection._id ? (t.s('in') + ' ' + collection.title + (isSearching?' / '+t.s('defaultCollection-0'):'')) : ''
                    }
                </span>
            </div>
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