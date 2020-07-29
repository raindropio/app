import React from 'react'
import View from './view'

export default class FiltersItem extends React.PureComponent {
    static defaultProps = {
        getLink: undefined
    }

    handlers = {
        onContextMenu: (e)=>{
            e.preventDefault()
        }
    }

    render() {
        return (
            <View 
                {...this.props}
                {...this.handlers}
                events={undefined}
                focusable={true} />
        )
    }
}