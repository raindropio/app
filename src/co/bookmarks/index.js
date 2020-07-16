import React from 'react'
import { connect } from 'react-redux'
import { makeBranchIds } from '~data/selectors/collections'
import { makeBookmarksLastChange } from '~data/selectors/bookmarks'

import List from '~co/virtual/list'
import Items from './items'

class Bookmarks extends React.Component {
    static defaultProps = {
        spaceId: 0,
        search: '',
        full: false //don't show nested folders in compact mode
    }

    renderSpace = (index)=>{
        const { ids, ignore, ...etc } = this.props
        const spaceId = ids[index]

        return (
            <Items 
                key={spaceId}
                {...etc}
                index={index}
                spaceId={spaceId}
                compact={ids.length>1}
                ignore={ignore} />
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
    
        return (state, { spaceId, search, full, activeId })=>{
            const lastChange = getBookmarksLastChange(state)

            if (full)
                return {
                    ids: [ spaceId ],
                    dataKey: spaceId+lastChange+activeId
                }
            else if (search && spaceId>0)
                return {
                    ids: [ spaceId, 0 ],
                    ignore: spaceId,
                    dataKey: spaceId+lastChange+activeId+search
                }
            else{
                const ids = getBranchIds(state, spaceId)
                
                return {
                    ids,
                    dataKey: ids.join('')+lastChange+activeId
                }
            }
        }
    }
)(Bookmarks)