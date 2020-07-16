import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as bookmarksActions from '~data/actions/bookmarks'
import { makeStatus, getSearchEmpty } from '~data/selectors/bookmarks'

import View from './view'

class BookmarksFooter extends React.Component {
    static defaultProps = {
        spaceId:        0,
        compact:    false,
        compactLimit:   0, //useful when compact is true, means that full items count more that showed right now
        events:         {} //{onCollectionClick}
    }
    
    render() {
        return (
            <View {...this.props} />
        )
    }
}

export default connect(
	() => {
        const getStatus = makeStatus()
    
        return (state, { spaceId })=>({
            status: getStatus(state, spaceId),
            isSearching: !getSearchEmpty(state, spaceId)
        })
    },
	(dispatch)=>({
		actions: bindActionCreators(bookmarksActions, dispatch)
    })
)(BookmarksFooter)