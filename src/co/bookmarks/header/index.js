import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as bookmarksActions from '~data/actions/bookmarks'
import { makeSelectModeEnabled } from '~data/selectors/bookmarks'
import { makeCollection } from '~data/selectors/collections'

import View from './view'

class BookmarksHeader extends React.Component {
    static defaultProps = {
        cid: 0
    }

    render() {
        return (
            <View {...this.props} />
        )
    }
}

export default connect(
	() => {
        const getCollection = makeCollection()
        const getSelectModeEnabled = makeSelectModeEnabled()
    
        return (state, { cid })=>{
            return {
                collection: getCollection(state, cid),
                selectModeEnabled: getSelectModeEnabled(state, cid)
            }
        }
    },
	(dispatch)=>({
		actions: bindActionCreators(bookmarksActions, dispatch)
    })
)(BookmarksHeader)