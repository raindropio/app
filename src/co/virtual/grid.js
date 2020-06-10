import React from 'react'
import List from './list'
import withAutoSize from './helpers/withAutoSize'

class VirtualGridRow extends React.Component {
    render() {
        const { className, row, item, computeItemKey, columnCount } = this.props
        
        const items = []
        for(var column=0; column<columnCount; column++){
            const index = row*columnCount + column
            if (computeItemKey(index))
                items.push(item(index))
        }

        return (
            <div className={className}>
                {items}
            </div>
        )
    }
}

class VirtualGrid extends React.Component {
    static defaultProps = {
        //...same as List
        columnWidth: 0, //required
        defaultItemHeight: 250
    }

    //measure columns and rows on container size change
    static getDerivedStateFromProps({ width, columnWidth, totalCount, disableVirtualization }, state) {
        const columnCount = Math.max(parseInt(width / columnWidth), 2)
        const rowCount = Math.ceil(totalCount / columnCount)

        if (rowCount == state.rowCount &&
            columnCount == state.columnCount)
            return null

        return {
            columnCount,
            rowCount,
            style: {
                '--grid-columns': columnCount,
                ...(!disableVirtualization ? { overflowY: 'overlay' } : { })
            }
        }
    }

    state = {}

    renderRow = row=>{
        const { className, item, computeItemKey } = this.props
        const { columnCount } = this.state

        return (
            <VirtualGridRow 
                row={row}
                className={className}
                item={item}
                computeItemKey={computeItemKey}
                columnCount={columnCount} />
        )
    }

    render() {
        const { rowCount, columnCount, style } = this.state
        const { dataKey='', scrollToIndex=0, ...etc } = this.props

        return (
            <List
                {...etc}

                className={undefined}
                computeItemKey={undefined}

                style={style}
                item={this.renderRow}

                dataKey={dataKey+columnCount+(!rowCount?'empty':'')}
                totalCount={rowCount}

                scrollToIndex={scrollToIndex >= 0 ? Math.ceil(scrollToIndex / columnCount) : -1}
            />
        )
    }
}

export default withAutoSize(VirtualGrid)