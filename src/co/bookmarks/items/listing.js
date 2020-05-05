import React from 'react'
import List from '~co/virtual/list'
import Item from '../item'

export default class BookmarksItems extends React.Component {
    rowRenderer = ({ index })=>{
        const _id = this.props.items[index]

        return (
            <Item
                _id={_id}
                cid={this.props.cid}
                //listing specififc
                selected={this.props.selectedId == index}
                events={this.props.events}
                actions={this.props.actions} />
        )
    }

    noMoreRows = ()=>
        this.props.status.nextPage == 'noMore'

    onEndReached = ()=>
        this.props.actions.nextPage(this.props.cid)

    render() {
        const { items, collection, selectedId } = this.props

        return (
            <List
                selectedId={selectedId}
                className={`elements view-${collection.view}`}
                rowCount={items.length}
                rowRenderer={this.rowRenderer}
                overscanRowCount={5}
                noMoreRows={this.noMoreRows}
                onEndReached={this.onEndReached} />
        )
    }
}