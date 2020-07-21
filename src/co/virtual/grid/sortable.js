import s from './sortable.module.styl'
import React from 'react'
import { ReactSortable } from 'react-sortablejs'

let _selected = -1
const emptyFunc = ()=>{}

export default class VirtualSortable extends React.PureComponent {
    static defaultProps = {
        type:          'default',
        className:      undefined,        
        items:          undefined,  //[{ id }]
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
        const { className='', type, items, children } = this.props

        return (
            <ReactSortable 
                group={type}
                className={s.sortable + ' ' + className}
                ghostClass={s.ghost}

                animation={150}

                list={items}
                setList={emptyFunc}

                onChoose={this.onChoose}
                onAdd={this.onEnd}
                onSort={this.onSort}>
                {children}
            </ReactSortable>
        )
    }
}