import s from './base.module.styl'
import React from 'react'
import { Virtuoso } from 'react-virtuoso'
import superScrollToIndex from '../helpers/superScrollToIndex'

const emptyObject = {}

export default class VirtualListBase extends React.PureComponent {
    static defaultProps = {
        className: '',              //
        item: undefined,            //required
        computeItemKey: undefined,  //required
        totalCount: 0,              //required
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

    render() {
        const { endReached, disableVirtualization, className='', scrollToIndex, ...etc } = this.props
        const Component = disableVirtualization ? NonVirtualList : Virtuoso

        return (
            <Component
                className={s.scrollable + ' ' + className}
                {...etc}
                ref={this._list}
                rangeChanged={endReached && this.rangeChanged}
                initialTopMostItemIndex={scrollToIndex > -1 ? scrollToIndex : undefined}
            />
        )
    }
}

export class NonVirtualList extends React.Component {
    render() {
        const { totalCount, item, className='', style, footer } = this.props
        const { ListContainer = 'div' } = this.props

        let items = []
        if (totalCount)
            for(var i = 0; i<totalCount; i++)
                items.push(item(i, emptyObject, emptyObject))

        return (
            <div className={className+' '+s.nonvirtual} style={style}>
                <ListContainer>
                    {items}
                </ListContainer>

                {footer && footer()}
            </div>
        )
    }
}