import s from './index.module.styl'
import React from 'react'
import { Helmet } from 'react-helmet'
import t from '~t'

import { Layout, Text } from '~co/common/form'
import Button from '~co/common/button'
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

                <Layout>
                    {status == 'error' && <Error error={error} />}
                    
                    <Text
                        type='text'
                        name='fullName'
                        disabled={status=='loading'}
                        autoFocus
                        required
                        placeholder={t.s('yourName')}
                        value={this.state.fullName}
                        onChange={this.onChangeValue} />

                    <Text
                        type='email'
                        name='email'
                        disabled={status=='loading'}
                        required
                        placeholder='Email'
                        value={this.state.email}
                        onChange={this.onChangeValue} />

                    <Text
                        type='password'
                        name='password'
                        disabled={status=='loading'}
                        required
                        placeholder={t.s('password')}
                        value={this.state.password}
                        onChange={this.onChangeValue} />

                    <Button
                        Tag='input' 
                        type='submit'
                        disabled={status=='loading'}
                        variant='primary'
                        data-block
                        value={t.s('register')} />
                </Layout>

                <div className={s.acceptLicence}>
                    {t.s('privacyTerms')} <a href='https://help.raindrop.io/terms' target='_blank'>{t.s('termsOfService')}</a> {t.s('und')} <a href='https://help.raindrop.io/privacy' target='_blank'>{t.s('privacyPolicy')}</a>
                </div>

                <Social {...this.props} />
            </form>
        )
    }
}

export default withPage(AccountSignup)