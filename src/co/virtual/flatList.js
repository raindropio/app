import React from 'react'

import 'react-virtualized/styles.css'
import AutoSizer from 'react-virtualized/dist/es/AutoSizer'
import Grid from 'react-virtualized/dist/es/Grid'
import InfiniteLoader from 'react-virtualized/dist/es/InfiniteLoader'
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized/dist/es/CellMeasurer'

class VirtualFlatListInner extends React.Component {
    static defaultProps = {
        columnWidth: 0,             //optional
        itemId: undefined,          //func, optional ({ index })
        noMoreItems: undefined,     //func, optional
        onEndReached: undefined,    //func, optional
    }

    getColumnCount = ()=>{
        if (!this.props.columnWidth)
            return 1

        return parseInt(this.props.width / this.props.columnWidth)
    }

    getItemIndex = (rowIndex, columnIndex)=>
        columnIndex + (rowIndex*this.state.columnCount)

    state = {
        columnCount: this.getColumnCount()
    }

    componentDidUpdate(prev) {
        if (prev.width != this.props.width || prev.columnWidth != this.props.columnWidth){
            const columnCount = this.getColumnCount()

            if (columnCount != this.state.columnCount){
                this.sizeCache.clearAll()
                this.setState({ columnCount })
            }
        }
    }

    sizeCache = new CellMeasurerCache({
        defaultHeight: 32,
        fixedWidth: true,
        keyMapper: this.props.itemId ? 
            (rowIndex, columnIndex)=>
                this.props.itemId(this.getItemIndex(rowIndex, columnIndex)) :
                undefined
    })

    cellRenderer = ({rowIndex, columnIndex, parent, style}) => {
        const index = this.getItemIndex(rowIndex, columnIndex)

        return (
            <CellMeasurer
                key={this.props.itemId ? this.props.itemId(index) : index}
                columnIndex={columnIndex}
                rowIndex={rowIndex}
                parent={parent}
                cache={this.sizeCache}>
                {({ registerChild }) =>
                    <div
                        style={this.props.columnWidth ? {...style, width: this.props.columnWidth} : style}
                        ref={registerChild}
                        tabIndex='-1'>
                        {this.props.itemRenderer(index)}
                    </div>
                }
            </CellMeasurer>
        )
    }

    isRowLoaded = ({ index }) => {
        if (this.props.noMoreItems)
            if (this.props.noMoreItems())
                return true

        if (index < this.props.itemsCount - 1)
            return true
    }

    onSectionRendered = ({ columnStartIndex, columnStopIndex, rowStartIndex, rowStopIndex })=>{
        const { columnCount } = this.state
        const startIndex = rowStartIndex * columnCount + columnStartIndex
        const stopIndex = rowStopIndex * columnCount + columnStopIndex
    
        this._onRowsRendered({
            startIndex,
            stopIndex
        })
    }

    renderGrid = ({ onRowsRendered, registerChild })=>{
        const { columnCount } = this.state
        const { columnWidth, width, height, ...etc } = this.props
        const rowCount = parseInt(this.props.itemsCount/this.state.columnCount) || this.props.itemsCount

        this._onRowsRendered = onRowsRendered

        return (
            <Grid
                tabIndex={-1}
                //props
                {...etc}
                //size
                width={width}
                height={height}
                columnWidth={columnWidth || width}
                rowHeight={this.sizeCache.rowHeight}
                deferredMeasurementCache={this.sizeCache}
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
                {...this.props} //force re-render on props change
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={onEndReached}
                rowCount={itemsCount}>
                {this.renderGrid}
            </InfiniteLoader>
        )
    }
}

export default class VirtualFlatList extends React.PureComponent {
    render() {
        return (
            <AutoSizer>{size =>
                size.width ? <VirtualFlatListInner {...this.props} {...size} /> : null
            }</AutoSizer>
        )
    }
}