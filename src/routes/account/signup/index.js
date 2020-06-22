import s from './index.module.styl'
import globalS from '../_page/index.module.styl'
import React from 'react'
import { Helmet } from 'react-helmet'
import t from '~t'

import withPage from '../_page'
import Social from '../social'
import Error from '../error'

class AccountSignup extends React.Component {
    state = {
        fullName: '',
        email: '',
        password: ''
    }

    onChangeValue = (e)=>
        this.setState({[e.target.name]: e.target.value})

    onSubmit = (e)=>{
        e.preventDefault()
        this.props.registerWithPassword(this.state)
    }

    render() {
        const status = this.props.status.register
        const error = this.props.error.register

        return (
            <form onSubmit={this.onSubmit}>
                <Helmet><title>{t.s('recoverPassword')}</title></Helmet>
                <h1>{t.s('startCollecting')}</h1><br/>

                {status == 'error' && <Error error={error} />}

                <input
                    type='text'
                    name='fullName'
                    disabled={status=='loading'}
                    autoFocus
                    required
                    placeholder={t.s('yourName')}
                    value={this.state.fullName}
                    onChange={this.onChangeValue} />

                <input
                    type='email'
                    name='email'
                    disabled={status=='loading'}
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

                <div className={globalS.buttons}>
                    <input 
                        type='submit'
                        disabled={status=='loading'}
                        className='button active standart input'
                        value={t.s('register')} />
                </div>
                <div className={s.acceptLicence}>
                    {t.s('privacyTerms')} <a href='https://help.raindrop.io/terms' target='_blank'>{t.s('termsOfService')}</a> {t.s('und')} <a href='https://help.raindrop.io/privacy' target='_blank'>{t.s('privacyPolicy')}</a>
                </div>

                <Social {...this.props} />
            </form>
        )
    }
}

export default withPage(AccountSignup)