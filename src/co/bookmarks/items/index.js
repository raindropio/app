import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as bookmarksActions from '~data/actions/bookmarks'
import { makeBookmarksIds, makeSelectModeEnabled } from '~data/selectors/bookmarks'
import { makeCollection } from '~data/selectors/collections'

import Listing from './listing'

class BookmarksItems extends React.Component {
    static defaultProps = {
        cid:        0,
        activeId:   0,
        events:     {}  //onItemClick
    }

    load = ()=>{
        this.props.actions.load(this.props.cid, this.props.search ? {
            search: this.props.search
        } : {})
    }

    componentDidMount() {
        this.load()
    }

    componentDidUpdate(prev) {
        if (prev.cid != this.props.cid ||
            prev.search != this.props.search)
            this.load()
    }
    
    render() {
        return (
            <Listing {...this.props} />
        )
    }
}

export default connect(
	() => {
        const getBookmarkIds = makeBookmarksIds()
        const getCollection = makeCollection()
        const getSelectModeEnabled = makeSelectModeEnabled()
    
        return (state, { cid })=>{
            const { view, access } = getCollection(state, cid)

            return {
                items: getBookmarkIds(state, cid),
                view,
                access,
                selectModeEnabled: getSelectModeEnabled(state, cid)
            }
        }
    },
	(dispatch)=>({
		actions: bindActionCreators(bookmarksActions, dispatch)
    }),
    undefined,
    { forwardRef: true }
)(BookmarksItems)