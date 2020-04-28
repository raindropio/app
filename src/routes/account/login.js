import React from 'react'
import { Helmet } from 'react-helmet'
import t from '~t'

import withPage from './_page'
import Icon from '~icon'
import Social from './social'
import Error from './error'

class AccountLogin extends React.Component {
    state = {
        email: '',
        password: ''
    }

    onChangeValue = (e)=>
        this.setState({[e.target.name]: e.target.value})

    onSubmit = (e)=>{
        e.preventDefault()
        this.props.loginWithPassword(this.state)
    }

    render() {
        const status = this.props.status.login
        const error = this.props.error.login

        return (
            <form onSubmit={this.onSubmit}>
                <Helmet><title>{t.s('signIn')}</title></Helmet>
                <Icon name='raindrop_logo' className='raindropLogo' />

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

                <input
                    type='password'
                    name='password'
                    disabled={status=='loading'}
                    required
                    placeholder={t.s('password')}
                    value={this.state.password}
                    onChange={this.onChangeValue} />

                <div className='additionalButtonWrap'>
                    <input 
                        type='submit'
                        disabled={status=='loading'}
                        className='button default standart loginButton input'
                        value={t.s('signIn')} />
                </div>

                <Social {...this.props} />
            </form>
        )
    }
}

export default withPage(AccountLogin)