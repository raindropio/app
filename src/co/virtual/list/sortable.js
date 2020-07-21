import './sortable.module.styl'
import React from 'react'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd'
import Base from './base'

const emptyObject = {}

export default class VirtuosoWithDnd extends React.Component {
    static defaultProps = {
        //...same as ./base
        type: 'default',            //optional
        rowIsDraggable: undefined,  //func, optional (index)
        rowIsDroppable: undefined,  //func, optional (fromIndex, toIndex)
        onDragStart: undefined,     //func, optional (index)
        onDragEnd: undefined,       //func (fromIndex,toIndex,action=combine|move)
        onLongHover: undefined,     //func, optional (fromIndex, toIndex), not works properly when content is changed!!!
    }

    renderListContainer = container=>(
        <ListContainer
            {...this.props}
            container={container} />
    )

    item = (index)=>{
        const { rowIsDraggable } = this.props

        return rowIsDraggable && rowIsDraggable(index) ? (
            <Draggable
                draggableId={String(index)}
                index={index}
                key={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        tabIndex={undefined}
                        onClick={null}>
                        {this.props.item(index, provided, snapshot)}
                    </div>
                )}
            </Draggable>
        ) : this.props.item(index, emptyObject, emptyObject)
    }
    
    render() {
        return (
            <>
                <Base
                    {...this.props}
                    ListContainer={this.renderListContainer}
                    ItemContainer={ItemContainer}
                    item={this.item} />

                <style dangerouslySetInnerHTML={{__html: `
                    [data-known-size]:empty {
                        height: var(--data-known-size)
                    }
                `}} />
            </>
        )
    }
}

class ListContainer extends React.Component {
    state = {
        isCombineEnabled: this.props.rowIsDroppable ? true: false
    }
    
    bindRef = (innerRef, listRef) => (ref) => {
        if (!ref || ref == this._div) return

        this._div = ref
        listRef && listRef(this._div)
        innerRef && innerRef(this._div)
    }

    //rbdnd specific
    onDragStart = ({ source })=>{
        this.props.onDragStart && this.props.onDragStart(source.index)
    }

    onDragUpdate = ({ source, combine })=>{
        clearTimeout(this._longHover)

        //Enable or disable dropping into items
        let isCombineEnabled = this.props.rowIsDroppable ? true : false
        if (combine && this.props.rowIsDroppable){
            const to = parseInt(combine.draggableId)
            isCombineEnabled = this.props.rowIsDroppable(source.index, to)

            //Long hover
            if (this.props.onLongHover && combine && isCombineEnabled)
                this._longHover = setTimeout(() => {
                    this.props.onLongHover(source.index, to)
                }, 500)
        }

        if (isCombineEnabled != this.state.isCombineEnabled)
            this.setState({ isCombineEnabled })
    }

    onDragEnd = ({ source, destination, combine })=>{
        clearTimeout(this._longHover)

        if (!this.props.onDragEnd) return

        if (combine)
            return this.props.onDragEnd(source.index, parseInt(combine.draggableId), 'combine')
        else if (destination && source.index != destination.index)
            this.props.onDragEnd(source.index, destination.index, 'move')
    }

    getContainerForClone = ()=>this._div

    renderClone = (provided, snapshot, { draggableId })=>(
        <div 
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}>
            {this.props.item(parseInt(draggableId), provided, snapshot)}
        </div>
    )

    render() {
        const { container: { listRef, children, ...etc } } = this.props
        const { type, disableVirtualization } = this.props

        return (
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd}>
                <Droppable
                    droppableId={type}
                    mode={disableVirtualization ? 'standard' : 'virtual'}
                    isCombineEnabled={this.state.isCombineEnabled}
                    renderClone={!disableVirtualization && this.renderClone}
                    getContainerForClone={this.getContainerForClone}>
                    {({ innerRef, droppableProps, placeholder }) => (
                        <div
                            {...droppableProps}
                            {...etc}
                            ref={this.bindRef(innerRef, listRef)}>
                            {children}
                            {disableVirtualization ? placeholder : null}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

class ItemContainer extends React.PureComponent {
    render() {
        return (
            <div {...this.props} style={{'--data-known-size': this.props['data-known-size']+'px'}} />
        )
    }
}