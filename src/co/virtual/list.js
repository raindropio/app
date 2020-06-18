import React from 'react'
import { Virtuoso } from 'react-virtuoso'
import Sortable from './helpers/sortable'
import superScrollToIndex from './helpers/superScrollToIndex'

const mainStyle = { width: '100%', height: '100%' }

export default class VirtualList extends React.PureComponent {
    static defaultProps = {
        className: '',              //
        item: undefined,            //required
        computeItemKey: undefined,  //required
        totalCount: 0,              //required
        empty: undefined,           //
        endReached: undefined,      //
        footer: undefined,
        disableVirtualization: false,
        defaultItemHeight: 80,
        scrollToIndex: -1,
        overscan: 500,

        sortable: false,
        onSort: undefined           //(fromId, toId)
    }

    _list = React.createRef()

    //scroll to index
    _visible = { startIndex:-1, endIndex:-1 }

    componentDidUpdate(prev) {
        if (prev.scrollToIndex != this.props.scrollToIndex)
            this._scrollToIndex()
    }

    _scrollToIndex() {
        const { scrollToIndex, totalCount } = this.props

        if (scrollToIndex >= 0 &&
            scrollToIndex <= totalCount &&
            this._list.current)
            superScrollToIndex(
                this._list.current.scrollToIndex,
                this._visible.startIndex,
                this._visible.endIndex,
                scrollToIndex
            )
    }

    rangeChanged = (range)=>{
        const { startIndex, endIndex } = range
        this._visible = { startIndex, endIndex }

        if (endIndex >= this.props.totalCount - (endIndex - startIndex)*2)
            this.props.endReached()

        if (this.props.rangeChanged)
            this.props.rangeChanged(range)
    }

    renderItem = index=>{
        const { item, empty, totalCount } = this.props
        
        if (!totalCount)
            return empty ? empty() : null

        return item(index)
    }

    computeItemKey = index=>{
        const { totalCount, computeItemKey } = this.props
        if (!totalCount) return 'empty'
        return computeItemKey ? computeItemKey(index) : index
    }

    renderContainer = ({ children, listRef, ...etc })=>{
        const { sortable, computeItemKey, onSort } = this.props

        const Component = <div ref={listRef} {...etc}>{children}</div>

        // if (sortable)
        //     return (
        //         <Sortable
        //             tag={Component}
        //             computeItemKey={computeItemKey}
        //             onSort={onSort}>
        //             {children}
        //         </Sortable>
        //     )
        
        return Component
    }

    render() {
        const { endReached, totalCount, dataKey, disableVirtualization, style, scrollToIndex, ...etc } = this.props
        const Component = disableVirtualization ? NonVirtualList : Virtuoso

        return (
            <Component
                {...etc}
                ref={this._list}
                dataKey={dataKey+(!totalCount?'empty':'')}
                totalCount={totalCount||1}
                item={this.renderItem}
                computeItemKey={this.computeItemKey}
                style={style || mainStyle}
                rangeChanged={endReached && this.rangeChanged}
                initialTopMostItemIndex={scrollToIndex > -1 ? scrollToIndex : undefined}
                ListContainer={this.renderContainer}
            />
        )
    }
}

export class NonVirtualList extends React.Component {
    render() {
        const { totalCount, item, className, style, footer } = this.props

        let items = []
        if (totalCount)
            for(var i = 0; i<totalCount; i++)
                items.push(item(i))

        return (
            <div className={className} style={{...style, height: 'auto'}}>
                {items}

                {footer && footer()}
            </div>
        )
    }
}