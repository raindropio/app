import s from './sortable.module.styl'
import React from 'react'
import { ReactSortable } from 'react-sortablejs'

/*
    Required! Each element should have data-id
*/

export default class VirtualSortable extends React.Component {
    static defaultProps = {
        sortGroup: '',
        sortSubGroup: '',           //optional
        onForceRerender: undefined, //func ()
        onSort: undefined           //func ({ _id, index, sortGroup }, { _id, index, sortGroup })
    }

    state = {
        items: []
    }

    static getDerivedStateFromProps({ children }) {
        return {
            items: Array.from(Array(children.length), () => ({}))
        }
    }

    getItem = (sortGroup, sortSubGroup, element)=>{
        let _id = parseInt(element.getAttribute('data-id'))

        if (!_id && element.children.length >= 1)
            _id = parseInt(element.children[0].getAttribute('data-id'))

        return {
            _id,
            sortGroup,
            sortSubGroup
        }
    }

    onEnd = ({ item, newDraggableIndex, to })=>{
        //new drag group
        let newGroup = to.parentElement.getAttribute('data-group')
        let newSubGroup = to.parentElement.getAttribute('data-sub-group')
        if (!isNaN(newGroup)) newGroup = parseInt(newGroup)

        if (!item || !to.children[newDraggableIndex])
            return

        const origin = this.getItem(this.props.sortGroup, this.props.sortSubGroup, item)
        const destination = this.getItem(newGroup, newSubGroup, to.children[newDraggableIndex])
        
        if (origin._id != destination._id)
            this.props.onSort(
                origin,
                destination
            )
    }

    render() {
        const { className='', children, sortGroup, sortSubGroup, listRef, onForceRerender, ...etc } = this.props
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
                    supportPointer={false} //fix safari >=13
                    
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