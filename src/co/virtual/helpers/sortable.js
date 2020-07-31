import s from './sortable.module.styl'
import React from 'react'
import { ReactSortable } from 'react-sortablejs'

const _computeItemKeyCache = {}

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
        _computeItemKeyCache[sortGroup+':'+sortSubGroup] = computeItemKey

        return {
            items: Array.from(Array(totalCount), () => ({}))
        }
    }

    componentWillUnmount() {
        delete _computeItemKeyCache[this.props.sortGroup+':'+this.props.sortSubGroup]
    }

    getItem = (sortGroup, sortSubGroup, index)=>{
        return {
            _id: _computeItemKeyCache[sortGroup+':'+sortSubGroup](index),
            sortGroup,
            sortSubGroup,
            index
        }
    }

    onEnd = ({ oldIndex, newDraggableIndex, to })=>{
        //new drag group
        let newGroup = to.parentElement.getAttribute('data-group')
        let newSubGroup = to.parentElement.getAttribute('data-sub-group')
        if (!isNaN(newGroup)) newGroup = parseInt(newGroup)

        const origin = this.getItem(this.props.sortGroup, this.props.sortSubGroup, oldIndex)
        const destination = this.getItem(newGroup, newSubGroup, newDraggableIndex)

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
                    onSort={undefined}
                    onEnd={this.onEnd}>
                    {children}
                </ReactSortable>
            </div>
        )
    }
}