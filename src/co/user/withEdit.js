import React from 'react'
import _ from 'lodash'
import t from '~t'
import { connect } from 'react-redux'
import { user, userStatus, errorReason } from '~data/selectors/user'
import { save } from '~data/actions/user'

import { Error, Alert } from '~co/overlay/dialog'

/*
    Component, [ 'name', ...etc ]
        ->
            unsaved: Bool
            status: 'loading', ...etc
            onChange, for input
            onSubmit
*/
export default (Component, fields=[])  => {
    class WithEditWrap extends React.Component {
        state = {
            unsaved: false,
            user: this.props.user
        }
    
        componentDidUpdate(prev) {
            if (prev.user != this.props.user)
                this.setState({
                    unsaved:false, 
                    user: this.props.user
                })
        }
    
        handlers = {
            onChange: (e)=>
                this.setState({
                    user: {
                        ...this.state.user,
                        [e.currentTarget.name]: e.currentTarget.value
                    },
                    unsaved: true
                }),
        
            onSubmit: (onSuccess)=>                
                this.props.save(
                    _.pick(this.state.user, fields),
                    ()=>{
                        Alert(t.s('saveSuccess'))
                        
                        if (typeof onSuccess == 'function')
                            onSuccess()
                    },
                    Error
                )
        }
    
        render() {
            const { user, error, ...etc } = this.props

            return (
                <Component
                    {...etc}
                    {...this.state.user}
                    {...this.handlers}
                    unsaved={this.state.unsaved} />
            )
        }
    }
    
    return connect(
        state=>({
            user: user(state),
            status: userStatus(state).save,
            error: errorReason(state).save
        }),
        { save }
    )(WithEditWrap)
}