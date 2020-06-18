import React from 'react'
import List from './list'
import withAutoSize from './helpers/withAutoSize'

class VirtualGrid extends React.Component {
    static defaultProps = {
        //...same as List
        columnWidth: 0, //required
        defaultItemHeight: 250 //required
    }

    state = {}

    //measure columns and rows on container size change
    static getDerivedStateFromProps({ width, height, columnWidth, defaultItemHeight, totalCount, disableVirtualization, ...etc }, state) {
        let columnCount = Math.max(parseInt(width / columnWidth), 2)

        let perRow = columnCount * Math.max(parseInt(height / defaultItemHeight), 1)
        let rowCount = Math.ceil(totalCount / perRow)

        let scrollToIndex = (etc.scrollToIndex||0) >= 0 ? parseInt(etc.scrollToIndex / perRow) : -1

        if (rowCount == state.rowCount &&
            perRow == state.perRow &&
            scrollToIndex == state.scrollToIndex)
            return null

        return {
            rowCount,
            perRow,
            scrollToIndex,
            defaultItemHeight: defaultItemHeight * (perRow/columnCount),
            style: {
                width: '100%',
                height: '100%',
                '--grid-columns': columnCount,
                ...(!disableVirtualization ? { overflowY: 'overlay' } : { })
            }
        }
    }

    getItems = (row)=>{
        const { perRow } = this.state

        let items = []
        for(var column=0; column<perRow; column++){
            const index = row*perRow + column
            items.push(index)
        }

        return items
    }

    renderRow = row=>{
        const { className, item, computeItemKey } = this.props
        
        return (
            <div className={className}>
                {this.getItems(row).filter(computeItemKey).map(item)}
            </div>
        )
    }

    render() {
        const { rowCount, perRow, scrollToIndex, style, defaultItemHeight } = this.state
        const { dataKey='', ...etc } = this.props

        return (
            <List
                {...etc}

                className={undefined}
                computeItemKey={undefined}

                style={style}
                item={this.renderRow}

                dataKey={dataKey+perRow+(!rowCount?'empty':'')}
                totalCount={rowCount}
                defaultItemHeight={defaultItemHeight}

                scrollToIndex={scrollToIndex}
            />
        )
    }
}

export default withAutoSize(VirtualGrid, 'grid')