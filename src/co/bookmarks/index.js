import React from 'react'
import { connect } from 'react-redux'
import { makeBranchIds } from '~data/selectors/collections'
import { makeBookmarksLastChange } from '~data/selectors/bookmarks'

import List from '~co/virtual/list'
import Items from './items'

class Bookmarks extends React.Component {
    renderSpace = (index)=>{
        const { ids, ...etc } = this.props
        const cid = ids[index]

        return (
            <Items 
                key={cid}
                {...etc}
                cid={cid}
                compact={ids.length>1} />
        )
    }

    indexToId = (index)=>
        this.props.ids[index]

    render() {
        const { cid, ids, lastChange } = this.props

        if (ids.length<=1)
            return this.renderSpace(0)

        return (
            <List 
                totalCount={ids.length}
                dataKey={cid+lastChange}
                item={this.renderSpace}
                computeItemKey={this.indexToId} />
        )
    }
}

export default connect(
	() => {
        const getBranchIds = makeBranchIds()
        const getBookmarksLastChange = makeBookmarksLastChange()
    
        return (state, { cid, search })=>{
            return {
                ids: search ? [ cid ] : getBranchIds(state, cid),
                lastChange: getBookmarksLastChange(state)
            }
        }
    }
)(Bookmarks)