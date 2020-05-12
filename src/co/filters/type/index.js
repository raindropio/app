import React from 'react'
import View from './view'

export default class FiltersType extends React.PureComponent {
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