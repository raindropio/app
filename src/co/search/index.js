import React from 'react'
import _ from 'lodash'

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
        onChange: ({ target })=>{
            const changed = (this.state.value||'').trim() != (target.value||'').trim()

            this.setState({ value: target.value }, ()=>{
                //nothing changed
                if (!changed)
                    return

                if (!this.state.value)
                    return this.handlers.onSubmit()

                //suggestions are showing right now, no autoSubmit
                if (this.props.outerRef.current &&
                    this.props.outerRef.current.firstChild)
                    return

                this.onSubmitBounced()
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