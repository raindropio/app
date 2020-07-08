import React from 'react'
import View from './view'

export default class FiltersStatus extends React.PureComponent {
    static defaultProps = {
        events: {}, //onItemClick, onItemAppendClick
        canAppend:  false,
    }

    handlers = {
        onClick: ()=>{
            this.props.events.onItemClick(this.props.query)
        },

        onAppendClick: this.props.events.onItemAppendClick ? ()=>
            this.props.events.onItemAppendClick(this.props.query) : undefined,

        onContextMenu: (e)=>{
            e.preventDefault()
        }
    }

    render() {
        return (
            <View {...this.props} {...this.handlers} />
        )
    }
}