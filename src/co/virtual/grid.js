import React from 'react'
import List from './list'
import withAutoSize from './helpers/withAutoSize'

class VirtualGrid extends React.PureComponent {
    static defaultProps = {
        //...same as List
        columnWidth: 0, //required
    }

    //measure columns and rows on container size change
    static getDerivedStateFromProps({ width, columnWidth, totalCount, disableVirtualization }, state) {
        const columnCount = Math.max(parseInt(width / columnWidth), 2)
        const rowCount = Math.ceil(totalCount / columnCount)

        if (columnCount == state.columnCount &&
            rowCount == state.rowCount)
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

        //items
        const { columnCount } = this.state
        
        const items = []
        for(var column=0; column<columnCount; column++){
            const index = row*columnCount + column
            if (computeItemKey(index))
                items.push(item(index))
        }

        return (
            <div className={className} key={row}>
                {items}
            </div>
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

                defaultItemHeight={250}
                scrollToIndex={scrollToIndex >= 0 ? Math.ceil(scrollToIndex / columnCount) : -1}
            />
        )
    }
}

export default withAutoSize(VirtualGrid)