import React from 'react'
import View from './view'

export default class CollectionsItem extends React.Component {
    static defaultProps = {
        item:       {},
        selected:   false,
        events:     {}, //same as ...items/index
        actions:    {} //redux collections
    }

    onClick = ()=>{
        this.props.events.onItemSelect(this.props.item)
    }

    onExpandClick = ()=>{
        this.props.actions.oneToggle(this.props.item._id)
    }

    onEditClick = ()=>{
        this.props.events.onItemEditClick && this.props.events.onItemEditClick(this.props.item)
    }

    onRemoveClick = ()=>{
        this.props.actions.oneRemove(this.props.item._id)
    }

    onContextMenu = (e)=>{
        e.preventDefault()
    }

    render() {
        const { item, ...props } = this.props

        return (
            <View 
                {...item}
                {...props}
                href={`#/collection/${item._id}`}
                onClick={props.events.onItemSelect && this.onClick}
                onExpandClick={this.onExpandClick}
                onEditClick={this.onEditClick}
                onRemoveClick={this.onRemoveClick}
                onContextMenu={this.onContextMenu} />
        )
    }
}