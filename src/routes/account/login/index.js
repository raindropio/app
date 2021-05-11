import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { userStatus, errorReason } from '~data/selectors/user'
import { loginWithPassword } from '~data/actions/user'

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Layout, Text, Label } from '~co/common/form'
import Button from '~co/common/button'
import Preloader from '~co/common/preloader'
import Social from '../social'
import { Error } from '~co/overlay/dialog'

class AccountLogin extends React.Component {
    state = {
        email: '',
        password: ''
    }

    componentDidUpdate(prev) {
        if (prev.error.login != this.props.error.login)
            Error(this.props.error.login)
    }

    onChangeValue = (e)=>
        this.setState({[e.target.name]: e.target.value})

    onSubmit = (e)=>{
        e.preventDefault()
        this.props.loginWithPassword(this.state)
    }

    render() {
        const status = this.props.status.login

        return (
            <form onSubmit={this.onSubmit}>
                <Helmet><title>{t.s('signIn')}</title></Helmet>

                <Layout>
                    <Label>Email {t.s('or')} {t.s('username').toLowerCase()}</Label>
                    <Text
                        type='text'
                        name='email'
                        disabled={status=='loading'}
                        autoFocus
                        required
                        inputMode='email'
                        value={this.state.email}
                        onChange={this.onChangeValue} />

                    <Label>
                        {t.s('password')}
                        <Link 
                            to='/account/lost'
                            tabIndex='1'>
                            {t.s('recoverPassword')}
                        </Link>
                    </Label>
                    <Text
                        type='password'
                        name='password'
                        disabled={status=='loading'}
                        required
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
                            value={t.s('signIn')} />
                    )}

                    <Social 
                        {...this.props}
                        disabled={status == 'loading'} />

                    <Button
                        as={Link}
                        to='/account/signup'
                        variant='link'
                        data-block>
                        {t.s('signUp')}
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
    { loginWithPassword }
)(AccountLogin)