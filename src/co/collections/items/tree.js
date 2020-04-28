import React from 'react'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List'

import Item from '../item'
import Group from '../group'

export default class CollectionsTree extends React.Component {
    _scrolled = false
    _bindList = ref => this._list = ref

    componentDidUpdate() {
        //scroll to selected on first paint
        if (this.props.data.length && !this._scrolled){
            this._scrolled = true

            if (this.props.selectedId)
                this._list.scrollToRow(
                    this.props.data
                        .findIndex(({item})=>item && item._id == this.props.selectedId)
                )
        }
    }

    rowRenderer = ({ index, key, style })=>{
        const row = this.props.data[index]

        let Component
        switch(row.type) {
            case 'group': Component = Group; break
            case 'collection': Component = Item; break
            default: return null
        }

        return (
            <div key={key} style={style}>
                <Component 
                    {...row}
                    key={row.item && row.item._id || key}
                    selected={row.item && this.props.selectedId == row.item._id}
                    events={this.props.events}
                    actions={this.props.actions} />
            </div>
        )
    }

    rowHeight = ({ index })=>{
        const row = this.props.data[index]

        switch(row.type) {
            case 'group': return 36
            default:
                return 32
        }
    }

    render() {
        const { data } = this.props

        return (
            <AutoSizer>{size =>
                <List
                    {...size}

                    ref={this._bindList}
                    data={this.props.selectedId}
                    className='collections'

                    rowCount={data.length}
                    rowHeight={this.rowHeight}
                    rowRenderer={this.rowRenderer}
                    scrollToAlignment='center'
                    />
            }</AutoSizer>
        )
    }
}