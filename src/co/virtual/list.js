import React from 'react'

import 'react-virtualized/styles.css'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import List from 'react-virtualized/dist/commonjs/List'
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader'
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized/dist/commonjs/CellMeasurer'

export default class VirtualList extends React.Component {
    static defaultProps = {
        rowId: undefined,           //func, optional ({ index })
        noMoreRows: undefined,      //func, optional
        onEndReached: undefined,    //func, optional
    }

    bindList = ref => {
        if (!ref || this._list == ref) return
        this._list = ref
        this.props.innerRef && this.props.innerRef(ref)
    }

    sizeCache = new CellMeasurerCache({
        defaultHeight: 32,
        fixedWidth: true,
        keyMapper: this.props.rowId ? 
            (index)=>this.props.rowId({ index }) :
            undefined
    })

    rowRenderer = source => (
        <CellMeasurer
            key={this.props.rowId ? this.props.rowId(source) : source.index}
            columnIndex={0}
            rowIndex={source.index}
            parent={source.parent}
            cache={this.sizeCache}>
            {({ registerChild }) =>
                <div
                    style={source.style}
                    ref={registerChild}
                    tabIndex='-1'>
                    {this.props.rowRenderer(source)}
                </div>
            }
        </CellMeasurer>
    )

    isRowLoaded = ({ index }) => {
        if (this.props.noMoreRows)
            if (this.props.noMoreRows())
                return true

        if (index < this.props.rowCount - 1)
            return true
    }

    render() {
        const { onEndReached, ...etc } = this.props

        return (
            <AutoSizer>{size =>
                <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    loadMoreRows={onEndReached}
                    rowCount={etc.rowCount}>
                    {({ onRowsRendered, registerChild }) =>
                        <List
                            {...size}
                            {...etc}
                            onRowsRendered={onRowsRendered}
                            tabIndex={-1}
                            rowHeight={this.sizeCache.rowHeight}
                            deferredMeasurementCache={this.sizeCache}
                            ref={registerChild}
                            rowRenderer={this.rowRenderer}
                            />
                    }
                </InfiniteLoader>
            }</AutoSizer>
        )
    }
}