import React from 'react'
import View from './view'

export default class FiltersStatus extends React.PureComponent {
    handlers = {
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