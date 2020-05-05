import React from 'react'
import List from '~co/virtual/list'
import Item from '../item'

export default class BookmarksItemsListing extends React.Component {
    rowRenderer = ({ index })=>{
        const _id = this.props.items[index]

        return (
            <Item
                _id={_id}
                //collection
                cid={this.props.cid}
                view={this.props.collection.view}
                access={this.props.collection.access}
                selectModeEnabled={this.props.selectModeEnabled}
                //listing specififc
                active={this.props.activeId == _id}
                events={this.props.events}
                actions={this.props.actions} />
        )
    }

    rowId = ({ index })=>
        this.props.items[index]

    noMoreRows = ()=>
        this.props.status.nextPage == 'noMore'

    onEndReached = async()=>
        this.props.actions.nextPage(this.props.cid)

    render() {
        const { items, collection, activeId, selectModeEnabled } = this.props

        return (
            <List
                className={`elements view-${collection.view} ${selectModeEnabled&&'select-mode'}`}
                //just to force re-render
                items={items} 
                activeId={activeId}
                //virtulized
                rowId={this.rowId}
                rowCount={items.length}
                rowRenderer={this.rowRenderer}
                noMoreRows={this.noMoreRows}
                onEndReached={this.onEndReached} />
        )
    }
}