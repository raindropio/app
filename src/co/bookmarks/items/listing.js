import React from 'react'
import List from '~co/virtual/list'
import Grid from '~co/virtual/grid'
import Masonry from '~co/virtual/masonry'

import Item from '../item'
import Empty from '../empty'
import Header from '../header'
import SelectMode from '../selectMode'
import Footer from '../footer'
import Section from '../section'
import coverSize from '../item/cover/size'

export default class BookmarksItemsListing extends React.Component {
    state = {
        itemsCheckpoint: 0
    }

    componentDidUpdate(prev) {
        if (prev.items != this.props.items)
            this.setState({ itemsCheckpoint: this.state.itemsCheckpoint+1 })
    }

    computeItemKey = (index)=>
        this.props.items[index]

    endReached = ()=>
        this.props.actions.nextPage(this.props.spaceId)

    onSort = (fromId, toId)=>
        this.props.actions.oneReorder(fromId, toId)

    renderItem = (index)=>{
        const _id = this.props.items[index]

        if (typeof _id == 'string')
            return (
                <Section 
                    key={_id}
                    type={_id} />
            )

        return (
            <Item
                key={_id}
                _id={_id}
                //collection
                spaceId={this.props.spaceId}
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
        <Empty spaceId={this.props.spaceId} compact={this.props.compact} />
    )

    renderHeader = ()=>
        this.props.selectModeEnabled ? (
            <SelectMode spaceId={this.props.spaceId} />
        ): (
            <Header spaceId={this.props.spaceId} compact={this.props.compact} />
        )

    renderFooter = ()=>(
        <Footer 
            spaceId={this.props.spaceId}
            compact={this.props.compact}
            more={this.props.items.length > this.props.compactLimit} />
    )

    render() {
        const { items, viewHide, gridSize, activeId, selectModeEnabled, compact } = this.props
        let { view } = this.props
        const { isDropping, dropHandlers } = this.props

        let Component

        // if (view == 'masonry' && compact)
        //     view = 'grid'

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
            <div 
                className={`
                    elements
                    ${isDropping && 'is-drag-over'}
                    ${viewHide.map(field=>`hide-${field}`).join(' ')}
                `}
                {...dropHandlers}>
                {this.renderHeader()}

                <Component
                    className={`items view-${view} ${selectModeEnabled&&'select-mode'}`}
                    dataKey={activeId+selectModeEnabled+view+this.state.itemsCheckpoint} //force re-render

                    item={this.renderItem}
                    empty={this.renderEmpty}
                    footer={this.renderFooter}
                    computeItemKey={this.computeItemKey}

                    totalCount={compact ? Math.min(items.length, this.props.compactLimit) : items.length}
                    columnWidth={coverSize(view, gridSize).width}
                    disableVirtualization={compact}
                    
                    scrollToIndex={activeId && items.length ? items.indexOf(activeId) : -1}
                    
                    endReached={this.endReached}

                    sortable={this.props.sort=='sort'}
                    onSort={this.onSort}
                    />
            </div>
        )
    }
}