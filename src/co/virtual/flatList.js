import React from 'react'

import 'react-virtualized/styles.css'
import AutoSizer from 'react-virtualized/dist/es/AutoSizer'
import Grid from 'react-virtualized/dist/es/Grid'
import InfiniteLoader from 'react-virtualized/dist/es/InfiniteLoader'
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized/dist/es/CellMeasurer'

export default class VirtualFlatList extends React.Component {
    static defaultProps = {
        columnWidth: 0,             //optional
        itemId: undefined,          //func, optional ({ index })
        itemsCount: undefined,      //required
        itemRenderer: undefined,    //required
        noMoreItems: undefined,     //func, optional
        onEndReached: undefined,    //func, optional
    }

    render() {
        const { className, ...etc } = this.props

        return (
            <AutoSizer className={className}>{size =>
                size.width ? <VirtualFlatListOuter {...etc} {...size} /> : null
            }</AutoSizer>
        )
    }
}

//Get columns and rows count with cellMeasurerCache
class VirtualFlatListOuter extends React.Component {
    //calculate columns and rows count
    getGridSize = ()=>{
        const { width, columnWidth, itemsCount } = this.props
        const columnCount = parseInt(width / columnWidth) || 1

        return {
            optimalColumnWidth: parseInt(width / columnCount),
            columnCount,
            rowCount: parseInt(itemsCount/columnCount) || itemsCount
        }
    }

    state = this.getGridSize()

    componentDidUpdate(prev) {
        if (prev.width != this.props.width ||
            prev.columnWidth != this.props.columnWidth ||
            prev.itemsCount != this.props.itemsCount) {
            const size = this.getGridSize()

            const columnsChanged = (
                size.columnCount != this.state.columnCount ||
                size.optimalColumnWidth != this.state.optimalColumnWidth
            )

            if (columnsChanged)
                this.sizeCache.clearAll()

            if (columnsChanged || size.rowCount != this.state.rowCount)
                this.setState(size)
        }
    }

    sizeCache = new CellMeasurerCache({
        fixedWidth: true,
        keyMapper: this.props.itemId ? 
            (rowIndex, columnIndex)=>
                this.props.itemId(
                    columnIndex + (rowIndex*this.state.columnCount)
                ) :
                undefined
    })

    render() {
        return (
            <VirtualFlatListInner 
                {...this.props}
                {...this.state}
                sizeCache={this.sizeCache} />
        )
    }
}

class VirtualFlatListInner extends React.Component {
    //render cells
    getItemIndex = (rowIndex, columnIndex)=>
        columnIndex + (rowIndex*this.props.columnCount)

    cellRenderer = ({rowIndex, columnIndex, parent, style}) => {
        const index = this.getItemIndex(rowIndex, columnIndex)
        const id = this.props.itemId(index)

        if (!id)
            return null

        return (
            <CellMeasurer
                key={id}
                columnIndex={columnIndex}
                rowIndex={rowIndex}
                parent={parent}
                cache={this.props.sizeCache}>
                {({ registerChild }) =>
                    <div
                        style={
                            this.props.columnCount>1 ? {
                                ...style,
                                width: this.props.optimalColumnWidth
                            } : style
                        }
                        ref={registerChild}
                        tabIndex='-1'>
                        {this.props.itemRenderer(index)}
                    </div>
                }
            </CellMeasurer>
        )
    }

    //inifinite load
    isRowLoaded = ({ index, ...etc }) => {
        if (this.props.noMoreItems)
            if (this.props.noMoreItems())
                return true

        if (index < this.props.itemsCount - 1)
            return true
    }

    onSectionRendered = ({ columnStartIndex, columnStopIndex, rowStartIndex, rowStopIndex })=>{
        const { columnCount } = this.props
        const startIndex = rowStartIndex * columnCount + columnStartIndex
        const stopIndex = rowStopIndex * columnCount + columnStopIndex
    
        this._onRowsRendered({
            startIndex,
            stopIndex
        })
    }

    //render wrap
    renderGrid = ({ onRowsRendered, registerChild })=>{
        const { width, height, columnCount, rowCount, optimalColumnWidth, sizeCache, ...etc } = this.props

        this._onRowsRendered = onRowsRendered

        return (
            <Grid
                tabIndex={-1}
                //props
                {...etc}
                //size
                width={width}
                height={height}
                columnWidth={optimalColumnWidth}
                rowHeight={sizeCache.rowHeight}
                deferredMeasurementCache={sizeCache}
                //columns, rows
                columnCount={columnCount}
                rowCount={rowCount}
                //inifinite load
                onSectionRendered={this.onSectionRendered}
                //other
                ref={registerChild}
                cellRenderer={this.cellRenderer} />
        )
    }

    render() {
        const { itemsCount, onEndReached } = this.props

        return (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={onEndReached}
                rowCount={itemsCount}>
                {il=>{
                    //important to have as inline func, otherwise doesn't re-render correctly
                    return this.renderGrid(il)
                }}
            </InfiniteLoader>
        )
    }
}