import s from './tree.module.styl'
import React from 'react'

import List from '~co/virtual/list'
import Item from '../item'
import Group from '../group'
import Empty from './empty'

export default class CollectionsTree extends React.Component {
    _scrolled = false

    state = {
        dataCheckpoint: 0,
        scrollToIndex: -1
    }

    componentDidUpdate(prev) {
        //scroll to active on first paint
        if (this.props.data.length && !this._scrolled){
            this._scrolled = true

            if (this.props.activeId && typeof this.props.activeId != 'object')
                this.scrollToId(this.props.activeId)
        }

        if (prev.data != this.props.data ||
            prev.customRows != this.props.customRows)
            this.setState({ dataCheckpoint: this.state.dataCheckpoint+1 })

        //scroll to blank new collection
        if (prev.blankId != this.props.blankId)
            this.scrollToId(this.props.blankId)
    }

    scrollToId = (id)=>
        this.setState({
            scrollToIndex: this.props.data
                .findIndex(({item})=>item && item._id == id)
        })
    
    //rendering rows
    rowRenderer = (index, provided, { isDragging, combineTargetFor })=>{
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
                uriPrefix={this.props.uriPrefix}
                active={active}
                multiselect={multiselect}
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
        const origin = this.props.data[from]

        if (origin)
            switch(origin.type){
                case 'collection': return origin.item.access.draggable
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

    onDragEnd = (from, to, action)=>{
        const origin = this.props.data[from]
        const target = this.props.data[to]

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
                        if (to < from){
                            for(let i=to-1; i>0; i--)
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
            <List            
                className={s.tree}
                    
                //react-virtuoso
                item={this.rowRenderer}
                totalCount={data.length + customRows.length}
                dataKey={String(activeId)+(typeof activeId)+dataCheckpoint} //only used to re-render when data re-ordered from outside
                scrollToIndex={scrollToIndex}
                defaultItemHeight={32}
                overscan={200}

                //custom
                rowIsDraggable={this.rowIsDraggable}
                rowIsDroppable={this.rowIsDroppable}
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd} />
        )
    }
}