import React from 'react'
import ReactDOM from 'react-dom'

import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import List from 'react-virtualized/dist/commonjs/List'
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized/dist/commonjs/CellMeasurer'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const emptyObject = {}

function getStyle({ draggableProps }, snapshot, source) {
    if (!draggableProps || !draggableProps.style)
        return source.style

    return {
        ...draggableProps.style,
        ...source.style,
    }
}

export default class SortableVirtualList extends React.Component {
    static defaultProps = {
        //specific for this component:
        rowType: undefined,         //func, optional ({ index })
        rowIsDraggable: undefined,  //func, optional ({ index })
        rowIsDroppable: undefined,  //func, optional (from, to)
        onDragStart: undefined,     //func, optional ({ index })
        onDragEnd: undefined,       //func (from,to,action=combine|move)
        onLongHover: undefined,     //func, optional (from, to), not works properly when content is changed!!!
    }

    state = {
        isCombineEnabled: true
    }

    bindList = (dragProvider) => ref => {
        if (!ref || this._list == ref) return
        this._list = ref

        dragProvider.innerRef(ReactDOM.findDOMNode(ref))
        this.props.innerRef && this.props.innerRef(ref)
    }

    sizeCache = new CellMeasurerCache({
        defaultHeight: 32,
        fixedWidth: true,
        keyMapper: (index)=>
            this.props.rowType ? this.props.rowType({ index }) : 1
    })

    renderRow = source => {
        //drag disabled
        if (!this.props.rowIsDraggable(source))
            return this.renderClone(undefined, undefined, { source })

        //drag enabled
        return (
            <Draggable
                key={source.index}
                draggableId={String(source.index)}
                index={source.index}>
                {(provided, snapshot)=>
                    this.renderClone(provided, snapshot, { source })
                }
            </Draggable>
        )
    }

    renderClone = (provided=emptyObject, snapshot=emptyObject, { source })=>(
        <div
            key={source.index}
            ref={provided.innerRef}
            {...provided.draggableProps||{}}
            {...provided.dragHandleProps||{}}
            style={getStyle(provided, snapshot, source)}
            tabIndex='-1'
            onClick={null}>
            <CellMeasurer
                parent={emptyObject}
                {...source}
                columnIndex={0}
                cache={this.sizeCache}>
                {this.props.rowRenderer(source, provided, snapshot)}
            </CellMeasurer>
        </div>
    )

    onDragStart = ({ source })=>{
        this.props.onDragStart && this.props.onDragStart(source)
    }

    onDragUpdate = ({ source, combine })=>{
        clearTimeout(this._longHover)

        //Enable or disable dropping into items
        let isCombineEnabled = true
        if (combine && this.props.rowIsDroppable){
            const to = { index: parseInt(combine.draggableId) }
            isCombineEnabled = this.props.rowIsDroppable(source, to)

            //Long hover
            if (this.props.onLongHover && combine && isCombineEnabled)
                this._longHover = setTimeout(() => {
                    this.props.onLongHover(source, to)
                }, 500)
        }

        if (isCombineEnabled != this.state.isCombineEnabled)
            this.setState({ isCombineEnabled })
    }

    onDragEnd = ({ source, destination, combine })=>{
        clearTimeout(this._longHover)

        if (!this.props.onDragEnd) return

        if (combine)
            return this.props.onDragEnd(source, { index: parseInt(combine.draggableId) }, 'combine')
        else if (destination && source.index != destination.index)
            this.props.onDragEnd(source, destination, 'move')
    }

    render() {
        const { ...other } = this.props

        return (
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd}>
                <Droppable
                    droppableId='collections'
                    mode='virtual'
                    isCombineEnabled={this.state.isCombineEnabled}
                    renderClone={this.renderClone}>
                    {dragProvider =>
                        <AutoSizer>{size =>
                            <List
                                {...size}
                                {...other}
                                tabIndex=''
                                rowHeight={this.sizeCache.rowHeight}
                                deferredMeasurementCache={this.sizeCache}
                                ref={this.bindList(dragProvider)}
                                rowRenderer={this.renderRow}
                                />
                        }</AutoSizer>
                    }
                </Droppable>
            </DragDropContext>
        )
    }
}