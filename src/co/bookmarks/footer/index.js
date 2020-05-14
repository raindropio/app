import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as bookmarksActions from '~data/actions/bookmarks'
import { makeStatus } from '~data/selectors/bookmarks'

import View from './view'

class BookmarksFooter extends React.Component {
    static defaultProps = {
        cid:        0,
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
    
        return (state, { cid })=>({
            status: getStatus(state, cid),
        })
    },
	(dispatch)=>({
		actions: bindActionCreators(bookmarksActions, dispatch)
    })
)(BookmarksFooter)