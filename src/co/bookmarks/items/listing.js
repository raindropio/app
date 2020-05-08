import React from 'react'
import List from '~co/virtual/list'
import Grid from '~co/virtual/grid'
import Masonry from '~co/virtual/masonry'

import Item from '../item'
import Footer from '../footer'

export default class BookmarksItemsListing extends React.Component {
    computeItemKey = (index)=>
        this.props.items[index]

    endReached = ()=>
        this.props.status.nextPage != 'noMore' &&
        this.props.actions.nextPage(this.props.cid)

    renderItem = (index)=>{
        const _id = this.props.items[index]

        return (
            <Item
                key={_id}
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

    renderFooter = ()=>(
        <Footer cid={this.props.cid} />
    )

    render() {
        const { items, collection, activeId, selectModeEnabled } = this.props
        
        let Component

        switch(collection.view) {
            case 'grid':
                Component = Grid
            break

            case 'masonry':
                Component = Masonry
            break

            default:
                Component = List
            break
        }

        return (
            <Component
                className={`elements view-${collection.view} ${selectModeEnabled&&'select-mode'}`}
                dataKey={activeId+selectModeEnabled+collection._id} //force re-render

                item={this.renderItem}
                footer={this.renderFooter}
                computeItemKey={this.computeItemKey}

                totalCount={items.length}
                columnWidth={250}
                
                endReached={this.endReached} 
                />
        )
    }
}