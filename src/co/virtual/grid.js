import React from 'react'
import { Virtuoso } from 'react-virtuoso'
import withAutoSize from './helpers/withAutoSize'

const mainStyle = { width: '100%', height: '100%', overflowY: 'overlay' }

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
    }

    //columns and rows count
    measure = ()=>{
        const { width, columnWidth, totalCount } = this.props
        const columnCount = parseInt(width / columnWidth)

        return {
            columnCount,
            rowCount: Math.ceil(totalCount / columnCount),
            style: {
                ...mainStyle,
                '--grid-columns': columnCount
            }
        }
    }

    state = this.measure()

    componentDidUpdate(prev) {
        if (prev.width == this.props.width &&
            prev.columnWidth == this.props.columnWidth &&
            prev.totalCount == this.props.totalCount)
            return

        const m = this.measure()
        if (m.columnCount != this.state.columnCount ||
            m.rowCount != this.state.rowCount)
            this.setState(m)
    }

    //rendering
    rangeChanged = ({ endIndex })=>{
        if (endIndex >= this.state.rowCount - 4)
            this.props.endReached()
    }

    renderRow = row=>{
        const { className, item, header, empty, computeItemKey, totalCount } = this.props

        //header
        if (row == 0)
            return (
                <div key='header'>
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
        const { dataKey='', endReached, stickyHeader, ...etc } = this.props

        return (
            <Virtuoso
                {...etc}

                className={undefined}
                computeItemKey={undefined}

                style={style}
                item={this.renderRow}

                dataKey={dataKey+columnCount}
                totalCount={rowCount ? rowCount+1 : 2}
                topItems={stickyHeader ? 1 : 0}

                rangeChanged={endReached && this.rangeChanged}
                defaultItemHeight={250}
            />
        )
    }
}

export default withAutoSize(VirtualGrid, false)