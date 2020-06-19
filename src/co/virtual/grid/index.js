import styles from './index.module.css'
import React from 'react'
import ListBase from '../list/base'
import Sortable from './sortable'
import withAutoSize from '../helpers/withAutoSize'

class VirtualGrid extends React.Component {
    static defaultProps = {
        //...same as List
        columnWidth: 0,             //required
        defaultItemHeight: 250,     //required

        type: undefined,            //
        rowIsDraggable: undefined,  //func, optional (index)
        onDragEnd: undefined,       //func (fromIndex,toIndex)
    }

    state = {}

    //measure columns and rows on container size change
    static getDerivedStateFromProps({ width, height, columnWidth, defaultItemHeight, totalCount, disableVirtualization, ...etc }, state) {
        let columnCount = Math.max(parseInt(width / columnWidth), 2)

        let perRow = disableVirtualization ? columnCount : Math.min(totalCount, columnCount * Math.max(parseInt(height / defaultItemHeight), 1))
        let rowCount = Math.ceil(totalCount / perRow)

        let scrollToIndex = (etc.scrollToIndex||0) >= 0 ? parseInt(etc.scrollToIndex / perRow) : -1

        if (columnCount == state.columnCount &&
            rowCount == state.rowCount &&
            perRow == state.perRow &&
            scrollToIndex == state.scrollToIndex)
            return null

        return {
            columnCount,
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

    renderRow = row => 
        <VirtualGridRow {...this.props} {...this.state} row={row} />

    render() {
        const { rowCount, perRow, scrollToIndex, style, defaultItemHeight } = this.state
        const { dataKey='', ...etc } = this.props

        return (
            <ListBase
                {...etc}

                className={undefined}
                computeItemKey={undefined}
                sortable={false}

                style={style}
                item={this.renderRow}

                dataKey={dataKey+perRow}
                totalCount={rowCount}
                defaultItemHeight={defaultItemHeight}

                scrollToIndex={scrollToIndex}

                onSort={this.onSort}
            />
        )
    }
}

class VirtualGridRow extends React.Component {
    static defaultProps = {
        dataKey: '',
        row: -1,
        perRow: 0,
        totalCount: 0,
        item: {},
        computeItemKey: undefined,
        className: ''
    }

    state = {
        items: []
    }

    static getDerivedStateFromProps({ row, perRow, computeItemKey, dataKey }, { _prevProps={} }) {
        if (row == _prevProps.row &&
            perRow == _prevProps.perRow &&
            dataKey == _prevProps.dataKey)
            return null

        let items = []
        for(var column=0; column < perRow; column++){
            const index = row*perRow + column
            const id = computeItemKey(index)

            if (id)
                items.push({ index, id })
        }

        return { items, _prevProps: {row, perRow, dataKey} }
    }

    getSortableId = (index)=>
        this.state.items[index].id

    renderItem = ({ index }, provided={}, snapshot={})=>
        this.props.item(index, provided, snapshot)

    render() {
        const { className, rowIsDraggable, onDragEnd } = this.props
        const { items } = this.state

        if (rowIsDraggable && rowIsDraggable(0))
            return (
                <Sortable
                    className={className+' '+styles.grid}
                    items={items}
                    onDragEnd={onDragEnd}>
                    {items.map(this.renderItem)}
                </Sortable>
            )
        else
            return (
                <div className={className+' '+styles.grid}>
                    {items.map(this.renderItem)}
                </div>
            )
    }
}

export default withAutoSize(VirtualGrid, 'grid')