import React from 'react'

import withAutoSize from './helpers/withAutoSize'
import { FixedSizeList as List } from 'react-window'
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

class VirtualSortable extends React.Component {
    static defaultProps = {
        //specific for this component:
        type: 'default',            //optional
        rowIsDraggable: undefined,  //func, optional ({ index })
        rowIsDroppable: undefined,  //func, optional (from, to)
        onDragStart: undefined,     //func, optional ({ index })
        onDragEnd: undefined,       //func (from,to,action=combine|move)
        onLongHover: undefined,     //func, optional (from, to), not works properly when content is changed!!!
    }

    state = {
        isCombineEnabled: true
    }

    renderRow = source => {
        //drag disabled
        if (this.props.rowIsDraggable && !this.props.rowIsDraggable(source))
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
            {this.props.children(source, provided, snapshot)}
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
        const { type, listRef, ...other } = this.props

        return (
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd}>
                <Droppable
                    droppableId={type}
                    mode='virtual'
                    isCombineEnabled={this.state.isCombineEnabled}
                    renderClone={this.renderClone}>
                    {droppableProvided =>
                        <List
                            {...other}
                            ref={listRef}
                            outerRef={droppableProvided.innerRef}>
                            {this.renderRow}
                        </List>
                    }
                </Droppable>
            </DragDropContext>
        )
    }
}

export default withAutoSize(VirtualSortable)