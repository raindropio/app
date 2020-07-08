import React from 'react'
import _ from 'lodash'

import View from './view'

export default class Search extends React.Component {
    static defaultProps = {
        spaceId: 0,
        value: '',
        events: {} //onSubmit
    }

    state = {
        value: this.props.value||''
    }

    componentDidMount() {
        this.onSubmitBounced = _.debounce(this.handlers.onSubmit, 250, { maxWait: 1000 })
    }

    componentDidUpdate(prev) {
        if (prev.value != this.props.value)
            this.setState({ value: this.props.value||'' })
    }

    handlers = {
        onChange: (e)=>{
            this.setState({ value: e.target.value }, ()=>{
                if (this.state.value.length>1)
                    this.onSubmitBounced()
                else if (!this.state.value)
                    this.handlers.onSubmit()
            })
        },

        onSubmit: ()=>{
            this.props.events.onSubmit && this.props.events.onSubmit(this.state.value)
        }
    }

    render() {
        return (
            <View
                {...this.props}
                {...this.state}
                {...this.handlers}
                events={undefined} />
        )
    }
}