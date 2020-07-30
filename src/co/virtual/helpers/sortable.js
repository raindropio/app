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
        onForceRerender: undefined, //func ()
        onDragEnd: undefined        //func ({ _id, index, dragGroup, dragType }, { _id, index, dragGroup, dragType })
    }

    state = {
        items: []
    }

    static getDerivedStateFromProps({ totalCount, dragGroup, dragType, computeItemKey }) {
        _cache[dragGroup] = Array.from(Array(totalCount), (_, index) => ({
            _id: computeItemKey(index),
            dragGroup,
            dragType,
            index
        }))

        return {
            items: _cache[dragGroup]
        }
    }

    onChoose = ({ oldIndex })=>{
        this._choosed = _cache[this.props.dragGroup][oldIndex]
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
        let oldDragGroup = this.props.dragGroup
        let newDragGroup = to.parentElement.getAttribute('data-group-id')
        if (!isNaN(newDragGroup)) newDragGroup = parseInt(newDragGroup)

        const origin = _cache[oldDragGroup][oldIndex]
        const destination = _cache[newDragGroup][newDraggableIndex]

        if (origin._id != destination._id)
            this.props.onDragEnd(
                origin,
                destination
            )
    }

    render() {
        const { className='', dragType, dragGroup, listRef, children, onForceRerender, ...etc } = this.props
        const { items } = this.state
        
        return (
            <div 
                ref={listRef}
                data-group-id={dragGroup}>
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