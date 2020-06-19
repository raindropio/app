import styles from './sortable.module.css'
import React from 'react'
import { ReactSortable } from 'react-sortablejs'

let _selected = -1
const emptyFunc = ()=>{}

export default class VirtualSortable extends React.PureComponent {
    static defaultProps = {
        type:          'default',
        className:      undefined,        
        items:          undefined,  //[{ id }]
        renderItem:     undefined,  //items.map(renderItem)
        onDragEnd:      undefined,  //(fromIndex, toIndex)
    }

    onChoose = ({ oldDraggableIndex })=>
        _selected = this.props.items[oldDraggableIndex].index

    onEnd = ({ newDraggableIndex })=>
        this.props.onDragEnd(
            _selected,
            this.props.items[newDraggableIndex].index
        )

    onSort = (e)=>{
        //sort in the same group
        if (e.from == e.to)
            this.onEnd(e)
    }

    render() {
        const { className, type, items, renderItem } = this.props

        return (
            <ReactSortable 
                group={type}
                className={className}
                ghostClass={styles.ghost}

                animation={150}

                list={items}
                setList={emptyFunc}

                onChoose={this.onChoose}
                onAdd={this.onEnd}
                onSort={this.onSort}>
                {items.map(renderItem)}
            </ReactSortable>
        )
    }
}