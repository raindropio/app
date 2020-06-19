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

    renderScrollContainer = container=>(
        <ScrollContainer
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
                        tabIndex='-1'
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
                    ScrollContainer={this.renderScrollContainer}
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

class ScrollContainer extends React.Component {
    state = {
        isCombineEnabled: this.props.rowIsDroppable ? true: false
    }
    
    bindRef = (innerRef) => (ref) => {
        if (!ref || this._div === ref) return

        this._div = ref
        innerRef(this._div)
    }

    //virtuoso specific
    onScroll = ({ target: { scrollTop } })=>
        this.props.container && this.props.container.reportScrollTop && this.props.container.reportScrollTop(scrollTop)

    scrollTo = scrollTop =>{
        this._div.scrollTo(scrollTop)
    }

    //rbdnd specific
    renderClone = (provided, snapshot, { draggableId })=>(
        <div 
            className={this.props.className}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            {this.props.item(parseInt(draggableId))}
        </div>
    )

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

    render() {
        const { container: { scrollTo, reportScrollTop, children, ...etc } } = this.props
        const { type, disableVirtualization } = this.props

        scrollTo && scrollTo(this.scrollTo)

        return (
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd}>
                <Droppable
                    droppableId={type}
                    mode={disableVirtualization ? 'standard' : 'virtual'}
                    isCombineEnabled={this.state.isCombineEnabled}
                    renderClone={!disableVirtualization && this.renderClone}>
                    {({ innerRef, droppableProps, placeholder }) => (
                        <div
                            {...etc}
                            {...droppableProps}
                            ref={this.bindRef(innerRef)}
                            onScroll={this.onScroll}>
                            {children}
                            {disableVirtualization && placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

class ItemContainer extends React.Component {
    render() {
        return (
            <div {...this.props} style={{'--data-known-size': this.props['data-known-size']+'px'}} />
        )
    }
}