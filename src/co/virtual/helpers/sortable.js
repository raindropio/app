import s from './sortable.module.styl'
import React from 'react'
import { ReactSortable } from 'react-sortablejs'

const _cache = {}

export default class VirtualSortable extends React.Component {
    static defaultProps = {
        computeItemKey: undefined,  //(index)
        totalCount: 0,

        dragType: '',
        dragGroup: '',
        dragSubGroup: '',           //optional
        onForceRerender: undefined, //func ()
        onDragEnd: undefined        //func ({ _id, index, dragGroup, dragType }, { _id, index, dragGroup, dragType })
    }

    state = {
        items: []
    }

    static getDerivedStateFromProps({ totalCount, dragGroup, dragSubGroup, dragType, computeItemKey }) {
        _cache[dragGroup+':'+dragSubGroup] = Array.from(Array(totalCount), (_, index) => ({
            _id: computeItemKey(index),
            dragGroup,
            dragSubGroup,
            dragType,
            index
        }))

        return {
            items: _cache[dragGroup+':'+dragSubGroup]
        }
    }

    onChoose = ({ oldIndex })=>{
        this._choosed = _cache[this.props.dragGroup+':'+this.props.dragSubGroup][oldIndex]
    }

    setDataTransferData = (dataTransfer, elem)=>{
        //special data in dnd event
        dataTransfer.setData('data', this._choosed)

        //put url in drag'n'drop data, by grabbing it from first link
        if (elem.hasChildNodes()){
            const childrens = elem.childNodes
            for(const child of childrens)
                if (child.tagName=='A'){
                    dataTransfer.setData('text/uri-list', child.href)
                    dataTransfer.setData('text/plain', child.href)
                    break
                }
        }
    }

    onEnd = ({ oldIndex, newDraggableIndex, to })=>{
        let oldGroupId = this.props.dragGroup+':'+this.props.dragSubGroup

        //new drag group
        let newGroupId = to.parentElement.getAttribute('data-group')
        if (!isNaN(newGroupId)) newGroupId = parseInt(newGroupId)
        newGroupId += ':'+to.parentElement.getAttribute('data-sub-group')

        const origin = _cache[oldGroupId][oldIndex]
        const destination = _cache[newGroupId][newDraggableIndex]

        if (origin._id != destination._id)
            this.props.onDragEnd(
                origin,
                destination
            )
    }

    render() {
        const { className='', dragType, dragGroup, dragSubGroup, listRef, children, onForceRerender, ...etc } = this.props
        const { items } = this.state
        
        return (
            <div 
                ref={listRef}
                data-group={dragGroup}
                data-sub-group={dragSubGroup}>
                <ReactSortable
                    {...etc}
                    className={className + ' ' + s.sortable}
                    ghostClass={s.ghost}
                    group={dragType}

                    animation={150}
                    delay={100}
                    delayOnTouchOnly={true}
                    scroll={false}
                    revertOnSpill={true}
                    removeOnSpill={true}
                    
                    filter='footer'
                    list={items}
                    setList={onForceRerender}

                    setData={this.setDataTransferData}
                    onChoose={this.onChoose}
                    onEnd={this.onEnd}>
                    {children}
                </ReactSortable>
            </div>
        )
    }
}