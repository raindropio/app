import s from './sortable.module.styl'
import React from 'react'
import { ReactSortable } from 'react-sortablejs'

let _selected = -1

export default class VirtualSortable extends React.PureComponent {
    static defaultProps = {
        groupId:        '',
        className:      undefined,        
        items:          undefined,  //[{ id }]
        onForceRerender:undefined,
        onDragEnd:      undefined,  //(fromIndex, toIndex)
    }

    onChoose = ({ oldDraggableIndex })=>
        _selected = this.props.items[oldDraggableIndex].index

    onEnd = ({ newDraggableIndex })=>{
        const item = this.props.items[newDraggableIndex]

        if (item)
            this.props.onDragEnd(
                _selected,
                item.index
            )
    }

    onSort = (e)=>{
        //sort in the same group
        if (e.from == e.to)
            this.onEnd(e)
    }

    render() {
        const { className='', groupId, items, children, onForceRerender } = this.props

        return (
            <ReactSortable 
                group={groupId}
                className={s.sortable + ' ' + className}
                ghostClass={s.ghost}

                animation={150}
                delay={100}
                delayOnTouchOnly={true}
                scroll={false}
                revertOnSpill={true}
                removeOnSpill={true}

                list={items}
                setList={onForceRerender}

                onChoose={this.onChoose}
                onAdd={this.onEnd}
                onSort={this.onSort}>
                {children}
            </ReactSortable>
        )
    }
}