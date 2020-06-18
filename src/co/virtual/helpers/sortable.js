import React from 'react'
import { ReactSortable } from 'react-sortablejs'

let _selected = -1

export default class VirtualSortable extends React.PureComponent {
    static defaultProps = {
        group:          'virtual',
        className:      undefined,        
        computeItemKey: undefined,  //(index)
        onSort:         undefined   //(fromId, toId)
    }

    getItems = ()=>{
        const { children, computeItemKey } = this.props

        const items = []
        for(var index=0; index < children.length; index++){
            const id = computeItemKey(index)

            if (id)
                items.push({ id })
        }

        return items
    }

    componentDidUpdate(prev) {
        if (prev.children != this.props.children)
            this.setState({ items: this.getItems() })
    }

    state = {
        items: this.getItems()
    }

    onSetItems = (items)=>
        this.setState({ items })

    onChoose = ({ oldDraggableIndex })=>
        _selected = this.state.items[oldDraggableIndex].id

    onEnd = ({ newDraggableIndex })=>{
        this.props.onSort(
            _selected,
            this.props.computeItemKey(newDraggableIndex)
        )
    }

    onSort = (e)=>{
        //sort in the same group
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