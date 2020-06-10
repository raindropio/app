import React from 'react'
import { VirtuosoGrid } from 'react-virtuoso'
import withAutoSize from './helpers/withAutoSize'
import superScrollToIndex from './helpers/superScrollToIndex'

class VirtualGrid extends React.Component {
    static defaultProps = {
        //...same as List
        columnWidth: 0, //required
        defaultItemHeight: 250
    }

    //measure columns and rows on container size change
    static getDerivedStateFromProps({ width, columnWidth, disableVirtualization }, state) {
        const columnCount = Math.max(parseInt(width / columnWidth), 2)

        if (columnCount == state.columnCount)
            return null

        return {
            columnCount,
            style: {
                'height': '100%',
                '--virtuoso-columns': columnCount,
                ...(!disableVirtualization ? { overflowY: 'overlay' } : { })
            }
        }
    }

    state = {}

    //scroll to index
    _list = React.createRef()

    _visible = { startIndex:-1, endIndex:-1 }

    componentDidUpdate(prev) {
        const { scrollToIndex, totalCount } = this.props

        if (prev.scrollToIndex != scrollToIndex &&
            scrollToIndex >= 0 &&
            scrollToIndex <= totalCount &&
            this._list.current)
            superScrollToIndex(
                this._list.current.scrollToIndex,
                this._visible.startIndex,
                this._visible.endIndex,
                scrollToIndex,
                prev.scrollToIndex != -1 ? 'smooth' : 'auto'
            )
    }

    rangeChanged = ({ startIndex, endIndex })=>{
        this._visible = { startIndex, endIndex }

        if (endIndex >= this.props.totalCount - (endIndex - startIndex)*2)
            this.props.endReached()
    }

    render() {
        const { style, columnCount } = this.state
        const { dataKey, className, endReached, ...etc } = this.props

        return (
            <VirtuosoGrid
                {...etc}

                className='virtuoso-grid'
                listClassName={className+' virtuoso-grid-list'}
                dataKey={dataKey+columnCount}
                overscan={1000}

                style={style}

                ref={this._list}
                rangeChanged={endReached && this.rangeChanged}
            />
        )
    }
}

export default withAutoSize(VirtualGrid)