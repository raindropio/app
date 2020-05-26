import React from 'react'
import { Virtuoso } from 'react-virtuoso'
import { NonVirtualList } from './list'
import withAutoSize from './helpers/withAutoSize'
import superScrollToIndex from './helpers/superScrollToIndex'

const mainStyle = { width: '100%', height: '100%' }
const stickyHeaderStyle = {position: 'sticky', top:0, zIndex: 99}

class VirtualGrid extends React.PureComponent {
    static defaultProps = {
        className: '',
        columnWidth: 0,             //required
        item: undefined,            //required
        header: undefined,          //required
        empty: undefined,
        computeItemKey: undefined,  //required
        totalCount: 0,              //required
        stickyHeader: false,
        disableVirtualization: false,
        scrollToIndex: -1
    }

    _grid = React.createRef()

    //scroll to index
    _visible = { startIndex:-1, endIndex:-1 }

    //columns and rows count
    measure = ()=>{
        const { width, columnWidth, totalCount, disableVirtualization } = this.props
        const columnCount = Math.max(parseInt(width / columnWidth), 2)

        return {
            columnCount,
            rowCount: Math.ceil(totalCount / columnCount),
            style: {
                ...mainStyle,
                '--grid-columns': columnCount,
                ...(!disableVirtualization ? { overflowY: 'overlay' } : { })
            }
        }
    }

    getRowIndex = (index)=>
        Math.ceil(index / this.state.columnCount)

    state = this.measure()

    componentDidUpdate(prev) {
        //measure columns and rows on container size change
        if (prev.width != this.props.width ||
            prev.columnWidth != this.props.columnWidth ||
            prev.totalCount != this.props.totalCount){
            const m = this.measure()
            if (m.columnCount != this.state.columnCount ||
                m.rowCount != this.state.rowCount)
                this.setState(m)
        }

        //scroll to index
        if (prev.scrollToIndex != this.props.scrollToIndex &&
            this._grid.current)
            setTimeout(() => {
                superScrollToIndex(
                    this._grid.current.scrollToIndex,
                    this._visible.startIndex,
                    this._visible.endIndex,
                    this.getRowIndex(this.props.scrollToIndex)
                )
            })
    }

    //rendering
    rangeChanged = ({ startIndex, endIndex })=>{
        this._visible = { startIndex, endIndex }

        if (endIndex >= this.state.rowCount - 4)
            this.props.endReached()
    }

    renderRow = row=>{
        const { className, item, header, empty, computeItemKey, totalCount, disableVirtualization } = this.props

        //header
        if (row == 0)
            return (
                <div key='header' style={disableVirtualization ? stickyHeaderStyle : undefined}>
                    {header()}
                </div>
            )

        //empty
        if (!totalCount)
            return (
                <div key='empty'>
                    {empty && empty()}
                </div>
            )

        //items
        const { columnCount } = this.state
        
        const items = []
        for(var column=0; column<columnCount; column++){
            const index = (row-1)*columnCount + column
            if (computeItemKey(index))
                items.push(item(index))
        }

        return (
            <div className={className} key={row-1}>
                {items}
            </div>
        )
    }

    render() {
        const { rowCount, columnCount, style } = this.state
        const { dataKey='', endReached, stickyHeader, disableVirtualization, scrollToIndex, ...etc } = this.props
        const Component = disableVirtualization ? NonVirtualList : Virtuoso

        return (
            <Component
                {...etc}
                ref={this._grid}

                className={undefined}
                computeItemKey={undefined}

                style={style}
                item={this.renderRow}

                dataKey={dataKey+columnCount+(!rowCount?'empty':'')}
                totalCount={rowCount ? rowCount+1 : 2}
                topItems={stickyHeader ? 1 : 0}

                rangeChanged={endReached && this.rangeChanged}
                defaultItemHeight={250}
                initialTopMostItemIndex={scrollToIndex >= 0 ? this.getRowIndex(scrollToIndex) : undefined}
            />
        )
    }
}

export default withAutoSize(VirtualGrid)