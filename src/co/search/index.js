import React from 'react'
import View from './view'

export default class Search extends React.Component {
    state = {
        focus: false
    }

    handlers = {
        onInputFocus: ()=>
            this.setState({ focus: true }),

        onInputBlur: ()=>
            this.setState({ focus: false })
    }

    render() {
        return (
            <View {...this.state} {...this.handlers} />
        )
    }
}