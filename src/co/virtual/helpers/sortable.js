import s from './sortable.module.styl'
import React from 'react'
import { ReactSortable } from 'react-sortablejs'

const _cache = {}

export default class VirtualSortable extends React.Component {
    static defaultProps = {
        computeItemKey: undefined,  //(index)
        totalCount: 0,

        sortGroup: '',
        sortSubGroup: '',           //optional
        onForceRerender: undefined, //func ()
        onSort: undefined           //func ({ _id, index, sortGroup }, { _id, index, sortGroup })
    }

    state = {
        items: []
    }

    static getDerivedStateFromProps({ totalCount, sortGroup, sortSubGroup, computeItemKey }) {
        _cache[sortGroup+':'+sortSubGroup] = Array.from(Array(totalCount), (_, index) => ({
            _id: computeItemKey(index),
            sortGroup,
            sortSubGroup,
            index
        }))

        return {
            items: _cache[sortGroup+':'+sortSubGroup]
        }
    }

    onEnd = ({ oldIndex, newDraggableIndex, to })=>{
        let oldGroupId = this.props.sortGroup+':'+this.props.sortSubGroup

        //new drag group
        let newGroupId = to.parentElement.getAttribute('data-group')
        if (!isNaN(newGroupId)) newGroupId = parseInt(newGroupId)
        newGroupId += ':'+to.parentElement.getAttribute('data-sub-group')

        const origin = _cache[oldGroupId][oldIndex]
        const destination = _cache[newGroupId][newDraggableIndex]

        if (origin._id != destination._id)
            this.props.onSort(
                origin,
                destination
            )
    }

    render() {
        const { className='', sortGroup, sortSubGroup, listRef, children, onForceRerender, ...etc } = this.props
        const { items } = this.state
        
        return (
            <div 
                ref={listRef}
                data-group={sortGroup}
                data-sub-group={sortSubGroup}>
                <ReactSortable
                    {...etc}
                    className={className + ' ' + s.sortable}
                    ghostClass={s.ghost}
                    group={sortGroup}

                    animation={150}
                    delay={100}
                    delayOnTouchOnly={true}
                    scroll={false}
                    revertOnSpill={true}
                    removeOnSpill={true}
                    
                    filter='footer'
                    list={items}
                    setList={onForceRerender}
                    onEnd={this.onEnd}>
                    {children}
                </ReactSortable>
            </div>
        )
    }
}