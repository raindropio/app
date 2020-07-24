import React from 'react'
import _ from 'lodash'
import lastPart from './helpers/lastPart'

import View from './view'

export default class Search extends React.Component {
    static defaultProps = {
        spaceId: 0,
        value: '',
        outerRef: undefined, //where to put suggestions
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
            const changed = (this.state.value||'').trim() != (e.target.value||'').trim()

            this.setState({ value: e.target.value }, ()=>{
                if (!changed || lastPart(this.state.value).startsWith('#'))
                    return

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