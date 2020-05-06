import React from 'react'
import FlatList from '~co/virtual/flatList'
import Item from '../item'

export default class BookmarksItemsListing extends React.Component {
    itemRenderer = (index)=>{
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

    itemId = (index)=>
        this.props.items[index]

    noMoreItems = ()=>
        this.props.status.nextPage == 'noMore'

    onEndReached = async()=>
        this.props.actions.nextPage(this.props.cid)

    render() {
        const { items, collection, activeId, selectModeEnabled } = this.props

        let Component = FlatList
        let columnWidth = 0

        switch(collection.view) {
            case 'grid':
            case 'masonry':
                columnWidth = 250
            break
        }

        return (
            <Component
                className={`elements view-${collection.view} ${selectModeEnabled&&'select-mode'}`}
                //just to force re-render
                key={collection._id+collection.view}
                items={items}
                activeId={activeId}
                selectModeEnabled={selectModeEnabled}
                //virtulized
                columnWidth={columnWidth}
                itemId={this.itemId}
                itemsCount={items.length}
                itemRenderer={this.itemRenderer}
                overscanRowCount={5}
                noMoreItems={this.noMoreItems}
                onEndReached={this.onEndReached} />
        )
    }
}