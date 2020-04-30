import React from 'react'
import Blank from './blank'
import View from './view'
import Rename from './rename'

export default class CollectionsItem extends React.Component {
    static defaultProps = {
        item:       {},
        selected:   false,
        events:     {}, //same as ...items/index
        actions:    {} //redux collections
    }

    state = {
        rename: false
    }

    onClick = ()=>{
        this.props.events.onItemSelect(this.props.item)
    }

    onExpandClick = ()=>{
        this.props.actions.oneToggle(this.props.item._id)
    }

    onRenameClick = ()=>
        this.setState({ rename: true })
    
    onRenameCancel = ()=>
        this.setState({ rename: false })

    onRemoveClick = ()=>{
        this.props.actions.oneRemove(this.props.item._id)
    }

    onContextMenu = (e)=>{
        e.preventDefault()
    }

    onKeyUp = (e)=>{
        switch(e.keyCode){
            case 37: //left
            case 39: //right
                e.preventDefault()
                return this.onExpandClick()

            case 46: //delete
            case 8: //backspace
                e.preventDefault()
                return this.onRemoveClick()

            case 13: //enter
                e.preventDefault()
                return this.onRenameClick()
        }
    }

    render() {
        const { item, uriPrefix, ...props } = this.props

        const Component = item._id == -101 ?
            Blank :
            (this.state.rename ? Rename : View)

        return (
            <Component 
                {...item}
                {...props}
                to={`${uriPrefix}${item._id}`}
                onClick={props.events.onItemSelect && this.onClick}
                onExpandClick={this.onExpandClick}
                onRenameClick={this.onRenameClick}
                onRenameCancel={this.onRenameCancel}
                onRemoveClick={this.onRemoveClick}
                onContextMenu={this.onContextMenu}
                onKeyUp={this.onKeyUp} />
        )
    }
}