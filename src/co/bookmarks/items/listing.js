import React from 'react'
import List from '~co/virtual/list'
import Grid from '~co/virtual/grid'
import Masonry from '~co/virtual/masonry'

import Item from '../item'
import Empty from '../empty'
import Header from '../header'
import Footer from '../footer'

export default class BookmarksItemsListing extends React.Component {
    computeItemKey = (index)=>
        this.props.items[index]

    endReached = ()=>
        this.props.actions.nextPage(this.props.cid)

    renderItem = (index)=>{
        const _id = this.props.items[index]

        return (
            <Item
                key={_id}
                _id={_id}
                //collection
                cid={this.props.cid}
                view={this.props.view}
                access={this.props.access}
                selectModeEnabled={this.props.selectModeEnabled}
                //listing specififc
                active={this.props.activeId == _id}
                events={this.props.events}
                actions={this.props.actions} />
        )
    }

    renderEmpty = ()=>(
        <Empty cid={this.props.cid} />
    )

    renderHeader = ()=>(
        <Header cid={this.props.cid} />
    )

    renderFooter = ()=>(
        <Footer cid={this.props.cid} />
    )

    render() {
        const { cid, items, view, activeId, selectModeEnabled } = this.props

        let Component

        switch(view) {
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
                className={`elements view-${view} ${selectModeEnabled&&'select-mode'}`}
                dataKey={activeId+selectModeEnabled+cid+view} //force re-render

                item={this.renderItem}
                header={this.renderHeader}
                empty={this.renderEmpty}
                footer={this.renderFooter}
                computeItemKey={this.computeItemKey}

                totalCount={items.length}
                columnWidth={250}
                stickyHeader={selectModeEnabled}
                
                endReached={this.endReached} 
                />
        )
    }
}