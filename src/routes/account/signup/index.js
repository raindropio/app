import s from './index.module.styl'
import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { userStatus, errorReason } from '~data/selectors/user'
import { registerWithPassword } from '~data/actions/user'

import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Layout, Text, Label } from '~co/common/form'
import Header, { Title } from '~co/common/header'
import Button from '~co/common/button'
import Preloader from '~co/common/preloader'
import Social from '../social'
import { Error } from '~co/overlay/dialog'

class AccountSignup extends React.Component {
    state = {
        fullName: '',
        email: '',
        password: ''
    }

    componentDidUpdate(prev) {
        if (prev.error.register != this.props.error.register)
            Error(this.props.error.register)
    }

    onChangeValue = (e)=>
        this.setState({[e.target.name]: e.target.value})

    onSubmit = (e)=>{
        e.preventDefault()
        this.props.registerWithPassword(this.state)
    }

    render() {
        const status = this.props.status.register

        return (
            <form onSubmit={this.onSubmit}>
                <Helmet><title>{t.s('recoverPassword')}</title></Helmet>
                <Header data-fancy>
                    <Title data-center>{t.s('startCollecting')}</Title>
                </Header>
                   
                <Layout>
                    <Label>{t.s('yourName')}</Label>               
                    <Text
                        type='text'
                        name='fullName'
                        disabled={status=='loading'}
                        autoFocus
                        required
                        placeholder='John Appleseed'
                        value={this.state.fullName}
                        onChange={this.onChangeValue} />

                    <Label>Email</Label>
                    <Text
                        type='email'
                        name='email'
                        disabled={status=='loading'}
                        required
                        placeholder='john@appleseed.com'
                        value={this.state.email}
                        onChange={this.onChangeValue} />

                    <Label>{t.s('password')}</Label>
                    <Text
                        type='password'
                        name='password'
                        disabled={status=='loading'}
                        required
                        placeholder='••••••••'
                        value={this.state.password}
                        onChange={this.onChangeValue} />

                    {status == 'loading' ? (
                        <Button variant='flat' data-block>
                            <Preloader />
                        </Button>
                    ) : (
                        <Button
                            as='input'
                            type='submit'
                            variant='primary'
                            data-block
                            value={t.s('register')} />
                    )}

                    <Social 
                        {...this.props}
                        disabled={status == 'loading'} />

                    <div className={s.acceptLicence}>
                        {t.s('privacyTerms')} <a href='https://help.raindrop.io/terms' target='_blank'>{t.s('termsOfService')}</a> {t.s('und')} <a href='https://help.raindrop.io/privacy' target='_blank'>{t.s('privacyPolicy')}</a>
                    </div>

                    <Button
                        as={Link}
                        to='/account/login'
                        variant='link'
                        data-block>
                        {t.s('signIn')}
                    </Button>
                </Layout>
            </form>
        )
    }
}

export default connect(
    state=>({
        status: userStatus(state),
		error: errorReason(state)
    }),
    { registerWithPassword }
)(AccountSignup)