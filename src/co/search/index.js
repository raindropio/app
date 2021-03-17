import React from 'react'
import debounce from '~modules/format/callback/debounce'
import Input from './input'
import Suggestions from './suggestions'

export default class Search extends React.PureComponent {
    static defaultProps = {
        spaceId: 0,
        value: '',
        outerRef: undefined, //where to put suggestions
        autoFocus: false,
        events: {} //onSubmit
    }

    state = {
        floating: !this.props.value,
        value: this.props.value||''
    }

    componentDidMount() {
        this.onSubmitBounced = debounce(this.handlers.onSubmit, 350, { maxWait: 1000 })
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
            this.setState(
                { value },
                ()=>{
                    if (!this.state.value || autoSubmit)
                        return this.handlers.onSubmit()

                    //suggestions are showing right now, no autoSubmit
                    if (!this.state.value.endsWith(' ') &&
                        this.props.outerRef.current &&
                        this.props.outerRef.current.firstChild)
                        return

                    this.onSubmitBounced()
                }
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