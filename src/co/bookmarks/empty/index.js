import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as bookmarksActions from '~data/actions/bookmarks'
import { makeStatus, getSearchEmpty } from '~data/selectors/bookmarks'

import View from './view'

class BookmarksEmpty extends React.Component {
    static defaultProps = {
        spaceId:        0,
        compact:    false
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
            searchEmpty: getSearchEmpty(state, spaceId)
        })
    },
	(dispatch)=>({
		actions: bindActionCreators(bookmarksActions, dispatch)
    })
)(BookmarksEmpty)