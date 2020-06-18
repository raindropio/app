import React from 'react'
import { ReactSortable } from 'react-sortablejs'
import List from './list'
import withAutoSize from './helpers/withAutoSize'

const _setList=()=>{}
let _selected = {}

class VirtualGridRow extends React.Component {
    state = {
        items: []
    }

    static getDerivedStateFromProps({ row, columnCount, computeItemKey }) {
        const items = []
        for(var column=0; column<columnCount; column++){
            const index = row*columnCount + column
            const id = computeItemKey(index)

            if (id)
                items.push({ index, id })
        }
        return { items }
    }

    onSortEnd = ({ item, newIndex })=>{
        const id = parseInt(item.getAttribute('data-id'))
        const order = this.props.row * this.props.columnCount + newIndex

        console.log(_selected)

        this.props.onDragEnd(id, order)
    }

    onSortSort = (e)=>{
        if (e.from == e.to)
            this.onSortEnd(e)
    }

    onChoose = ({ oldDraggableIndex })=>{
        _selected = this.state.items[oldDraggableIndex]
    }

    render() {
        const { className, item } = this.props
        const { items } = this.state

        return (
            <ReactSortable 
                group='virtual'
                className={className}
                chosenClass='is-dragging'
                list={items}
                setList={_setList}
                onAdd={this.onSortEnd}
                onSort={this.onSortSort}
                onChoose={this.onChoose}
                animation={150}>
                {items.map(({index, id})=>(
                    <div data-id={id} key={id}>
                        {item(index)}
                    </div>
                ))}
            </ReactSortable>
        )
    }
}

class VirtualGrid extends React.Component {
    static defaultProps = {
        //...same as List
        columnWidth: 0, //required
        defaultItemHeight: 250
    }

    state = {}

    //measure columns and rows on container size change
    static getDerivedStateFromProps({ width, columnWidth, totalCount, disableVirtualization, ...etc }, state) {
        let columnCount = Math.max(parseInt(width / columnWidth), 2)
        let rowCount = Math.ceil(totalCount / columnCount)

        let scrollToIndex = (etc.scrollToIndex||0) >= 0 ? parseInt(etc.scrollToIndex / columnCount) : -1

        if (rowCount == state.rowCount &&
            columnCount == state.columnCount &&
            scrollToIndex == state.scrollToIndex)
            return null

        return {
            columnCount,
            rowCount,
            scrollToIndex,
            style: {
                width: '100%',
                height: '100%',
                '--grid-columns': columnCount,
                ...(!disableVirtualization ? { overflowY: 'overlay' } : { })
            }
        }
    }

    _computeItemKey = (row)=>{
        const { computeItemKey } = this.props
        const { columnCount } = this.state

        let key = ''
        for(var column=0; column<columnCount; column++){
            const index = row*columnCount + column
            key += computeItemKey(index)+'_'
        }

        return key||row
    }

    renderRow = row=>{
        const { className, item, computeItemKey, onDragEnd } = this.props
        const { columnCount } = this.state

        return (
            <VirtualGridRow 
                row={row}
                className={className}
                item={item}
                computeItemKey={computeItemKey}
                columnCount={columnCount}
                onDragEnd={onDragEnd} />
        )
    }

    render() {
        const { rowCount, columnCount, scrollToIndex, style } = this.state
        const { dataKey='', ...etc } = this.props

        return (
            <List
                {...etc}

                className={undefined}
                computeItemKey={this._computeItemKey}

                style={style}
                item={this.renderRow}

                dataKey={dataKey+columnCount+(!rowCount?'empty':'')}
                totalCount={rowCount}

                scrollToIndex={scrollToIndex}
            />
        )
    }
}

export default withAutoSize(VirtualGrid, 'grid')