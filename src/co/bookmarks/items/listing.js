import s from './listing.module.styl'
import React from 'react'
import { SPACE_PER_PAGE } from '~data/constants/bookmarks'
import List from '~co/virtual/list'
import Grid from '~co/virtual/grid'
import Masonry from '~co/virtual/masonry'

import Item from '../item'
import Empty from '../empty'
import Header from '../header'
import SelectMode from '../selectMode'
import Footer from '../footer'
import coverSize from '../item/cover/size'
import AccentColor from '~co/collections/item/accentColor'

export default class BookmarksItemsListing extends React.Component {
    state = {
        itemsCheckpoint: 0,
        topItemsVisible: true
    }

    componentDidMount() {
        window.addEventListener('focus', this.onWindowFocus)
    }

    componentDidUpdate(prev) {
        if (prev.items != this.props.items)
            this.setState({ itemsCheckpoint: this.state.itemsCheckpoint+1 })
    }

    componentWillUnmount() {
        window.removeEventListener('focus', this.onWindowFocus)
    }

    onWindowFocus = ()=>{
        if (this.state.topItemsVisible)
            this.props.actions.refresh(this.props.spaceId)
    }

    computeItemKey = (index)=>
        this.props.items[index]

    rangeChanged = ({ endIndex })=>{
        const topItemsVisible = endIndex < SPACE_PER_PAGE
        if (topItemsVisible != this.state.topItemsVisible)
            this.setState({ topItemsVisible })
    }

    endReached = ()=>
        this.props.actions.nextPage(this.props.spaceId)

    //dnd
    sortEnabled = ()=>
        this.props.sort=='sort' && 
        !this.props.selectModeEnabled &&
        this.props.access &&
        this.props.access.level >= 3

    onSort = (from, to)=>
        this.props.actions.oneReorder(from._id, to._id)

    renderItem = (index)=>{
        const _id = this.props.items[index]

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
                getLink={this.props.getLink}
                events={this.props.events}
                actions={this.props.actions} />
        )
    }

    renderEmpty = ()=>(
        <Empty 
            spaceId={this.props.spaceId} 
            compact={this.props.compact}
            getLink={this.props.getLink}
            events={this.props.events} />
    )

    renderHeader = ()=>{
        const Component = this.props.selectModeEnabled ? SelectMode : Header

        return (
            <Component 
                spaceId={this.props.spaceId} 
                compact={this.props.compact} 
                index={this.props.index}
                getLink={this.props.getLink}
                events={this.props.events} />
        )
    }

    renderFooter = ()=>(
        <Footer 
            spaceId={this.props.spaceId}
            compact={this.props.compact}
            compactLimit={this.props.compactLimit}
            count={this.props.items.length}
            getLink={this.props.getLink}
            events={this.props.events} />
    )

    render() {
        const { _id, items, viewHide, gridSize, listCoverRight, buttons, activeId, selectModeEnabled, compact } = this.props
        const { isDropping, dropHandlers } = this.props

        //specific view
        let { view } = this.props
    
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
            <AccentColor _id={_id}>{style=>
                <div 
                    role='list'
                    className={`
                        ${s.elements}
                        ${s['wrap-'+view]}
                        ${isDropping && s.isDropping}
                        ${viewHide.map(field=>`hide-${field}`).join(' ')}
                        ${buttons.map(field=>`button-${field}`).join(' ')}
                        ${listCoverRight && 'list-cover-right'}
                    `}
                    style={style}
                    {...dropHandlers}>
                    {this.renderHeader()}

                    {items.length ? (
                        <Component
                            className={s.items+' '+s[view]}
                            dataKey={activeId+selectModeEnabled+view+this.state.itemsCheckpoint} //force re-render

                            item={this.renderItem}
                            footer={this.renderFooter}
                            computeItemKey={this.computeItemKey}

                            totalCount={compact ? Math.min(items.length, this.props.compactLimit) : items.length}
                            columnWidth={coverSize(view, gridSize).width}
                            disableVirtualization={compact}
                            
                            scrollToIndex={activeId && items.length ? items.indexOf(activeId) : -1}
                            
                            endReached={this.endReached}
                            rangeChanged={this.rangeChanged}

                            //sortable
                            sortGroup={_id}
                            sortEnabled={this.sortEnabled()}
                            onSort={this.onSort}
                            />
                    ) : (
                        <>
                            {this.renderEmpty()}
                            {this.renderFooter()}
                        </>
                    )}
                </div>
            }</AccentColor>
        )
    }
}