import React from 'react'
import View from './view'

export default class FiltersSection extends React.PureComponent {
    static defaultProps = {
        //...item,
        actions:    {} //redux filters, config
    }

    handlers = {
        onClick: ()=>{
            this.props.actions.sidebarHide(this.props._id, !this.props.hidden)
        }
    }

    render() {
        return (
            <View {...this.props} {...this.handlers} />
        )
    }
}