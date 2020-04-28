import React from 'react'
import View from './view'

export default class CollectionsGroup extends React.PureComponent {
    static defaultProps = {
        //...item,
        selected:   false,
        events:     {}, //same as ...items/index
        actions:    {} //redux collections
    }

    onClick = ()=>{
        if (this.props.events.onGroupSelect)
            return this.props.events.onGroupSelect(this.props)
            
        this.props.actions.groupToggle(this.props._id)
    }

    onContextMenu = (e)=>{
        e.preventDefault()
    }

    render() {
        return (
            <View 
                {...this.props}
                onClick={this.onClick}
                onContextMenu={this.onContextMenu} />
        )
    }
}