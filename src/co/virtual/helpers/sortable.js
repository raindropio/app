import React from 'react'
import { ReactSortable } from 'react-sortablejs'

let _selected = {}

export default class VirtualSortable extends React.Component {
    static defaultProps = {
        group:          'virtual',
        className:      undefined,
        totalCount:     0,
        
        computeItemKey: undefined,  //(index)
        onSort:         undefined   //(fromId, toId)
    }

    getItems = ()=>{
        const { totalCount, computeItemKey } = this.props

        const items = []
        for(var index=0; index<totalCount; index++){
            const id = computeItemKey(index)

            if (id)
                items.push({ index, id })
        }

        return items
    }

    componentDidUpdate(prev) {
        if (prev.totalCount != this.props.totalCount)
            this.setState({ items: this.getItems() })
    }

    state = {
        items: this.getItems()
    }

    onSetItems = (items)=>
        this.setState({ items })

    onChoose = ({ oldDraggableIndex })=>{
        _selected = this.state.items[oldDraggableIndex]
    }

    onEnd = ({ newDraggableIndex })=>{
        const { id } = _selected
        this.props.onSort(id, this.state.items[newDraggableIndex])
    }

    onSort = (e)=>{
        if (e.from == e.to)
            this.onEnd(e)
    }

    render() {
        const { className, group, children } = this.props
        const { items } = this.state

        return (
            <ReactSortable 
                group={group}
                className={className}
                chosenClass='is-dragging'

                animation={150}

                list={items}
                setList={this.onSetItems}

                onChoose={this.onChoose}
                onAdd={this.onEnd}
                onSort={this.onSort}>
                {children}
            </ReactSortable>
        )
    }
}