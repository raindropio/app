import React from 'react'
import { connect } from 'react-redux'
import { makeBranchIds } from '~data/selectors/collections'
import { makeBookmarksLastChange } from '~data/selectors/bookmarks'

import List from '~co/virtual/list'
import Items from './items'

class Bookmarks extends React.Component {
    static defaultProps = {
        cid: 0,
        search: '',
        full: false //don't show nested folders in compact mode
    }

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
        const { ids, dataKey } = this.props

        if (ids.length<=1)
            return this.renderSpace(0)

        return (
            <List 
                totalCount={ids.length}
                dataKey={dataKey} //re-render on items change
                defaultItemHeight={0} //fix initial render
                overscan={0}
                item={this.renderSpace}
                computeItemKey={this.indexToId} />
        )
    }
}

export default connect(
	() => {
        const getBranchIds = makeBranchIds()
        const getBookmarksLastChange = makeBookmarksLastChange()
        const cache = {}
    
        return (state, { cid, search, full, activeId })=>{
            const lastChange = getBookmarksLastChange(state)

            if (search || full)
                return {
                    ids: cache[cid] = cache[cid] || [ cid ],
                    dataKey: cid+lastChange+activeId
                }
            else{
                const ids = getBranchIds(state, cid)
                
                return {
                    ids,
                    dataKey: ids.join('')+lastChange+activeId
                }
            }
        }
    }
)(Bookmarks)