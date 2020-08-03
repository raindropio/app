import React from 'react'
import _ from 'lodash'
import Input from './input'
import Suggestions from './suggestions'

export default class Search extends React.PureComponent {
    static defaultProps = {
        spaceId: 0,
        value: '',
        outerRef: undefined, //where to put suggestions
        events: {} //onSubmit
    }

    state = {
        floating: !this.props.value,
        value: this.props.value||''
    }

    componentDidMount() {
        this.onSubmitBounced = _.debounce(this.handlers.onSubmit, 350, { maxWait: 1000 })
    }

    componentDidUpdate(prev) {
        if (prev.value != this.props.value)
            this.setState({
                floating: !this.props.value,
                value: this.props.value||''
            })
    }

    handlers = {
        onChange: (value, autoSubmit=false)=>{
            const changed = (this.state.value||'').trim() != (value||'').trim()

            this.setState(
                { value },
                changed ? ()=>{
                    if (!this.state.value || autoSubmit)
                        return this.handlers.onSubmit()

                    //suggestions are showing right now, no autoSubmit
                    if (this.props.outerRef.current &&
                        this.props.outerRef.current.firstChild)
                        return

                    this.onSubmitBounced()
                } : undefined
            )
        },

        onSubmit: e=>{
            if (e && e.preventDefault)
                e.preventDefault()
            this.props.events.onSubmit(this.state.value)
        }
    }

    render() {
        return (
            <Input
                {...this.props}
                {...this.state}
                {...this.handlers}>
                {downshift => (
                    <Suggestions 
                        downshift={downshift}

                        outerRef={this.props.outerRef}
                        floating={this.state.floating}
                        spaceId={this.props.spaceId} />
                )}
            </Input>
        )
    }
}