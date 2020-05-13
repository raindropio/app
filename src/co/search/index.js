import React from 'react'
import Input from './input'

export default class Search extends React.Component {
    static defaultProps = {
        value: '',
        events: {} //onSubmit
    }

    state = {
        value: this.props.value||''
    }

    componentDidUpdate(prev) {
        if (prev.value != this.props.value)
            this.setState({ value: this.props.value||'' })
    }

    handlers = {
        onChange: (value, callback)=>{
            this.setState({ value }, callback)
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