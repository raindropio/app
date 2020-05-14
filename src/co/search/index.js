import React from 'react'
import _ from 'lodash'
import Input from './input'

export default class Search extends React.Component {
    static defaultProps = {
        value: '',
        events: {} //onSubmit
    }

    state = {
        value: this.props.value||''
    }

    componentDidMount() {
        this.handlers.onSubmitBounced = _.debounce(this.handlers.onSubmit, 250, { maxWait: 1000 })
    }

    componentDidUpdate(prev) {
        if (prev.value != this.props.value)
            this.setState({ value: this.props.value||'' })
    }

    handlers = {
        onChange: (value, callback)=>{
            this.setState({ value }, ()=>{
                if (this.state.value.length>1)
                    this.handlers.onSubmitBounced()
                else if (!this.state.value)
                    this.handlers.onSubmit()

                callback && callback()
            })
        },

        onSubmit: ()=>{
            this.props.events.onSubmit && this.props.events.onSubmit(this.state.value)
        }
    }

    render() {
        return (
            <div className='search'>
                <Input 
                    {...this.props}
                    {...this.state}
                    {...this.handlers} />
            </div>
        )
    }
}