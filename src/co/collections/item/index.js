import React from 'react'
import Blank from './blank'
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

    onKeyDown = (e)=>{
        switch(e.keyCode){
            case 37: //left
            case 39: //right
                return this.onExpandClick()

            case 46: //delete
                return this.onRemoveClick()

            case 8: //backspace
                if (e.metaKey || e.ctrlKey)
                    return this.onRemoveClick()
            break

            case 13: //enter
                return this.onEditClick()
        }
    }

    render() {
        const { item, uriPrefix, ...props } = this.props
        const Component = item._id == -101 ? Blank : View

        return (
            <Component 
                {...item}
                {...props}
                to={`${uriPrefix}${item._id}`}
                onClick={props.events.onItemSelect && this.onClick}
                onExpandClick={this.onExpandClick}
                onEditClick={this.onEditClick}
                onRemoveClick={this.onRemoveClick}
                onContextMenu={this.onContextMenu}
                onKeyDown={this.onKeyDown} />
        )
    }
}