import React from 'react'

import Sortable from '~co/virtual/sortable'
import Item from '../item'
import Group from '../group'
import Empty from './empty'

export default class CollectionsTree extends React.Component {
    _list = React.createRef()
    _scrolled = false

    componentDidUpdate() {
        //scroll to active on first paint
        if (this.props.data.length && !this._scrolled && this._list.current){
            this._scrolled = true

            if (this.props.activeId)
                this._list.current.scrollToItem(
                    this.props.data
                        .findIndex(({item})=>item && item._id == this.props.activeId)
                )
        }
    }
    
    //rendering rows
    rowRenderer = ({ index }, provided, { isDragging, combineTargetFor })=>{
        const row = this.props.data[index]

        let Component
        switch(row.type) {
            case 'group': Component = Group; break
            case 'collection': Component = Item; break
            default:
                if (this.props.customRowRenderer)
                    return this.props.customRowRenderer(row)
        }

        return (
            <Component 
                //item,etc
                {...row}
                //tree specififc
                uriPrefix={this.props.uriPrefix}
                active={row.item && this.props.activeId == row.item._id}
                events={this.props.events}
                actions={this.props.actions}
                //drag/drop specific
                isDragging={isDragging}
                isDropping={combineTargetFor?true:false}
                />
        )
    }

    //drag/drop
    rowIsDraggable = ({ index })=>{
        const row = this.props.data[index]

        //disable for system collections
        if (row)
            switch(row.type){
                case 'collection':
                    if (row.item._id <= 0)
                        if (row.item._id==-101)
                            return true
                        else
                            return false
                    return true

                case 'group':
                    return row.system ? false : true
            }

        return false
    }

    rowIsDroppable = (from)=>{
        const origin = this.props.data[from.index]

        if (origin)
            switch(origin.type){
                case 'collection': return origin.item.access.draggable
            }

        return false
    }

    onDragStart = ({ index })=>{
        const row = this.props.data[index]

        if (row)
            switch(row.type) {
                case 'collection':{
                    const { item } = row

                    if (item.expanded)
                        this.props.actions.oneToggle(item._id)
                }break
            }
    }

    onDragEnd = (from, to, action)=>{
        const origin = this.props.data[from.index]
        const target = this.props.data[to.index]

        switch (origin.type) {
            case 'collection':{
                if (action=='move')
                    if (target.type == 'collection'){
                        if (to.index >= from.index)
                            this.props.actions.oneReorder(origin.item._id, { after: target.item._id })
                        else if (to.index <= from.index)
                            this.props.actions.oneReorder(origin.item._id, { before: target.item._id })
                    }
                    else {
                        //to end of previous group
                        if (to.index < from.index){
                            for(let i=to.index-1; i>0; i--)
                                if (this.props.data[i].type=='collection'){
                                    this.props.actions.oneReorder(origin.item._id, { after: this.props.data[i].item._id })
                                    break
                                }
                        }
                        //to start of current group
                        else
                            action = 'combine'
                    }

                if (action=='combine')
                    this.props.actions.oneReorder(origin.item._id, { to: target.item ? target.item._id : target._id })
            }break
            
            case 'group':{
                let after, before

                if (to.index > from.index) {
                    if (target.type == 'group')
                        after = target._id
                    else
                        for(let i=to.index-1; i>0; i--)
                            if (this.props.data[i].type=='group'){
                                after=this.props.data[i]._id
                                break
                            }
                } else if (to.index < from.index) {
                    if (target.type == 'group')
                        before = target._id
                    else
                        for(let i=to.index+1; i<this.props.data.length; i++)
                            if (this.props.data[i].type=='group'){
                                before=this.props.data[i]._id
                                break
                            }
                }

                if (after || before)
                    this.props.actions.groupReorder(origin._id, { after, before })
            }break
        }
    }

    render() {
        if (!this.props.data.length)
            return <Empty />

        return (
            <Sortable
                activeId={this.props.activeId}
                
                //react-window
                listRef={this._list}
                itemCount={this.props.data.length}
                itemData={this.props.data} //only used to re-render when data re-ordered from outside
                itemSize={32}
                overscanCount={5}

                //custom
                rowIsDraggable={this.rowIsDraggable}
                rowIsDroppable={this.rowIsDroppable}
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}>
                {this.rowRenderer}
            </Sortable>
        )
    }
}