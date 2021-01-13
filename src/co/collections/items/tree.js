import s from './tree.module.styl'
import React from 'react'

import Tree from '~co/virtual/tree'
import Item from '../item'
import Group from '../group'
import Empty from './empty'
import { ItemHeightCallback } from '~co/common/list'
import ProCheck from '~co/user/pro/check'

export default class CollectionsTree extends React.Component {
    state = {
        dataCheckpoint: 0,
        scrollToIndex: -1
    }

    componentDidUpdate(prev) {
        //scroll to active
        if (prev.activeId != this.props.activeId && 
            typeof this.props.activeId != 'object' &&
            this.props.data.length)
            this.scrollToId(this.props.activeId)

        if (prev.data != this.props.data ||
            prev.customRows != this.props.customRows)
            this.setState({ dataCheckpoint: this.state.dataCheckpoint+1 })

        //scroll to blank new collection
        if (prev.blankId != this.props.blankId)
            this.scrollToId(this.props.blankId)
    }

    scrollToId = (id)=>
        setTimeout(()=>{
            this.setState({
                scrollToIndex: this.props.data
                    .findIndex(({item})=>item && item._id == id)
            })  
        })
    
    //rendering rows
    rowRenderer = (index, provided, snapshot={})=>{
        const { isDragging, combineTargetFor } = snapshot
        const row = this.props.data[index]

        if (!row)
            if (this.props.customRowRenderer)
                return this.props.customRowRenderer(
                    this.props.customRows[index - this.props.data.length]
                )

        let Component, active = false, multiselect = false
        switch(row.type) {
            case 'group':
                Component = Group
            break

            case 'collection':
                Component = Item
                
                switch(typeof this.props.activeId){
                    case 'object':
                        active = this.props.activeId.includes(row.item._id)
                        multiselect = true
                    break

                    default:
                        active = this.props.activeId == row.item._id
                    break
                }
            break

            default:
                return null
        }

        return (
            <Component 
                //item,etc
                {...row}
                //tree specififc
                active={active}
                multiselect={multiselect}
                getLink={this.props.getLink}
                events={this.props.events}
                actions={this.props.actions}
                //drag/drop specific
                isDragging={isDragging}
                isDropping={combineTargetFor?true:false}
                />
        )
    }

    //drag/drop
    rowIsDraggable = (index)=>{
        //disable when multiselect
        if (typeof this.props.activeId == 'object')
            return false

        const row = this.props.data[index]

        //disable for system collections
        if (row)
            switch(row.type){
                case 'collection':
                    if (row.item._id <= 0){
                        if (row.item._id==-101)
                            return true
                        else
                            return false
                    }
                    return true

                case 'group':
                    return row.system ? false : true
            }

        return false
    }

    rowIsDroppable = (from, to)=>{
        const origin = this.props.data[from]
        const target = this.props.data[to]

        if (origin && origin.item)
            switch(origin.type){
                case 'collection': 
                    if (!origin.item.access || !origin.item.access.draggable)
                        return false

                    if (target.item)
                        return target.item.access && (target.item.access.root || target.item.access.draggable)
                    
                    return true
            }

        return false
    }

    onDragStart = (index)=>{
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

    onDragEnd = async(from, to, action)=>{
        const origin = this.props.data[from]
        const target = this.props.data[to]

        if (!origin || !target) return

        switch (origin.type) {
            case 'collection':{
                if (action=='move')
                    if (target.type == 'collection'){
                        if (to >= from)
                            this.props.actions.oneReorder(origin.item._id, { after: target.item._id })
                        else if (to <= from)
                            this.props.actions.oneReorder(origin.item._id, { before: target.item._id })
                    }
                    else {
                        //to end of previous group
                        if (to < from &&
                            this.props.data[to-1]){
                            const prev = this.props.data[to-1]

                            this.props.actions.oneReorder(
                                origin.item._id, 
                                prev.item ? 
                                    { after: this.props.data[to-1].item._id } : 
                                    { to: prev._id }
                            )
                        }
                        //to start of current group
                        else
                            action = 'combine'
                    }

                if (action=='combine'){
                    //prevent move collection to collection for non-pro
                    if (target.item && !await ProCheck('nested'))
                        return

                    this.props.actions.oneReorder(origin.item._id, { to: target.item ? target.item._id : target._id })
                }
            }break
            
            case 'group':{
                let after, before

                if (to > from) {
                    if (target.type == 'group')
                        after = target._id
                    else
                        for(let i=to-1; i>0; i--)
                            if (this.props.data[i].type=='group'){
                                after=this.props.data[i]._id
                                break
                            }
                } else if (to < from) {
                    if (target.type == 'group')
                        before = target._id
                    else
                        for(let i=to+1; i<this.props.data.length; i++)
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
        const { data, activeId, customRows=[] } = this.props
        const { dataCheckpoint, scrollToIndex } = this.state

        if (!data.length)
            return <Empty />

        return (
            <ItemHeightCallback>{itemHeight=>
                <Tree            
                    className={s.tree}
                        
                    //base
                    item={this.rowRenderer}
                    totalCount={data.length + customRows.length}
                    dataKey={String(activeId)+(typeof activeId)+dataCheckpoint} //only used to re-render when data re-ordered from outside
                    scrollToIndex={scrollToIndex}
                    itemHeight={itemHeight}
    
                    //custom
                    rowIsDraggable={this.rowIsDraggable}
                    rowIsDroppable={this.rowIsDroppable}
                    onDragStart={this.onDragStart}
                    onDragEnd={this.onDragEnd} 
                    />
            }</ItemHeightCallback>
        )
    }
}