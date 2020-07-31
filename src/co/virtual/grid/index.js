import s from './index.module.styl'
import React from 'react'
import ListBase from '../list/base'
import Sortable from '../helpers/sortable'
import withAutoSize from '../helpers/withAutoSize'

class VirtualGrid extends React.Component {
    static defaultProps = {
        //...same as List
        //...same as sortable
        columnWidth: 0,             //required
        defaultItemHeight: 250,     //required
    }

    state = {
        innerDataKey: ''
    }

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
            style: { '--grid-columns': columnCount }
        }
    }

    onForceRerender = ()=>
        this.setState({innerDataKey: new Date().getTime()})

    renderRow = row => 
        <VirtualGridRow 
            key={row} 
            {...this.props} 
            {...this.state} 
            row={row}
            onForceRerender={this.onForceRerender} />

    render() {
        const { rowCount, perRow, scrollToIndex, style, defaultItemHeight, innerDataKey } = this.state
        const { dataKey='', ...etc } = this.props

        return (
            <ListBase
                {...etc}

                className={s.scrollable}
                computeItemKey={undefined}

                style={style}
                item={this.renderRow}

                dataKey={dataKey+perRow+innerDataKey}
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
        item: undefined,
        computeItemKey: undefined,
        className: '',

        sortGroup: ''
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

    computeItemKey = (index)=>
        this.state.items && this.state.items[index] && this.state.items[index].id

    renderItem = ({ index })=>
        this.props.item(index)

    render() {
        const { className, row, totalCount } = this.props
        const { sortEnabled, sortGroup, onForceRerender, onSort } = this.props
        const { items } = this.state

        if (sortEnabled)
            return (
                <Sortable
                    className={className+' '+s.grid}
                    totalCount={totalCount}
                    sortGroup={sortGroup}
                    sortSubGroup={row}
                    onForceRerender={onForceRerender}
                    onSort={onSort}>
                    {items.map(this.renderItem)}
                </Sortable>
            )
        else
            return (
                <div className={className+' '+s.grid}>
                    {items.map(this.renderItem)}
                </div>
            )
    }
}

export default withAutoSize(VirtualGrid, 'grid')