import React from 'react'
import { Virtuoso } from 'react-virtuoso'
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
        disableVirtualization: false,
        defaultItemHeight: 80,
        scrollToIndex: -1,
        overscan: 1000
    }

    _list = React.createRef()

    //scroll to index
    _visible = { startIndex:-1, endIndex:-1 }

    componentDidUpdate(prev) {
        const { scrollToIndex=-1, totalCount } = this.props

        if (prev.scrollToIndex != scrollToIndex &&
            scrollToIndex >= 0 &&
            scrollToIndex <= totalCount &&
            this._list.current)
            superScrollToIndex(
                this._list.current.scrollToIndex,
                this._visible.startIndex,
                this._visible.endIndex,
                scrollToIndex
            )
    }

    rangeChanged = ({ startIndex, endIndex })=>{
        this._visible = { startIndex, endIndex }

        if (endIndex >= this.props.totalCount - (endIndex - startIndex)*2)
            this.props.endReached()
    }

    renderItem = index=>{
        const { item, empty, totalCount } = this.props
        
        if (!totalCount)
            return (
                <div key='empty'>
                    {empty && empty()}
                </div>
            )

        return item(index)
    }

    computeItemKey = index=>{
        const { totalCount, computeItemKey } = this.props
        if (!totalCount) return 'empty'
        return computeItemKey ? computeItemKey(index) : index
    }

    render() {
        const { endReached, totalCount, dataKey, disableVirtualization, scrollToIndex=0, style={}, ...etc } = this.props
        const Component = disableVirtualization ? NonVirtualList : Virtuoso

        return (
            <Component
                {...etc}
                ref={this._list}
                dataKey={dataKey+(!totalCount?'empty':'')}
                totalCount={totalCount}
                item={this.renderItem}
                computeItemKey={this.computeItemKey}
                style={{...mainStyle, ...style}}
                rangeChanged={endReached && this.rangeChanged}
                initialTopMostItemIndex={scrollToIndex >= 0 ? scrollToIndex : undefined}
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