import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import t from '~t'

import withPage from './_page'
import Error from './error'

class AccountLost extends React.Component {
    state = {
        email: ''
    }

    onChangeValue = (e)=>
        this.setState({[e.target.name]: e.target.value})

    onSubmit = (e)=>{
        e.preventDefault()
        
        this.props.lostPassword(this.state)
    }

    render() {
        const status = this.props.status.lost
        const error = this.props.error.lost

        if (status == 'success')
            return (
                <div>
                    <h2 className='headLabel'>{t.s('checkYourEmail')}</h2>
                </div>
            )

        return (
            <form onSubmit={this.onSubmit}>
                <Helmet><title>{t.s('recoverPassword')}</title></Helmet>
                <h1 className='headLabel'>{t.s('recoverPassword')}</h1><br/>

                {status == 'error' && <Error error={error} />}

                <input
                    type='email'
                    name='email'
                    disabled={status=='loading'}
                    autoFocus
                    required
                    placeholder='Email'
                    value={this.state.email}
                    onChange={this.onChangeValue} />

                <div className='additionalButtonWrap'>
                    <input 
                        type='submit'
                        disabled={status=='loading'}
                        className='button default standart loginButton input'
                        value={t.s('recoverPassword')} />
                </div>
            </form>
        )
    }
}

export default withPage(AccountLost)