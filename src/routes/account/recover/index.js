import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { userStatus, errorReason } from '~data/selectors/user'
import { recoverPassword } from '~data/actions/user'

import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Layout, Label, Text, Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Preloader from '~co/common/preloader'
import Header, { Title } from '~co/common/header'
import { Error } from '~co/overlay/dialog'

class AccountRecover extends React.Component {
    state = {
        password: ''
    }

    componentDidUpdate(prev) {
        if (prev.error.recover != this.props.error.recover)
            Error(this.props.error.recover)
    }

    onChangeValue = (e)=>
        this.setState({[e.target.name]: e.target.value})

    onSubmit = (e)=>{
        e.preventDefault()

        this.props.recoverPassword({
            ...this.state,
            token: this.props.match.params.token
        })
    }

    render() {
        const status = this.props.status.recover

        return (
            <form onSubmit={this.onSubmit}>
                <Helmet><title>{t.s('recoverPassword')}</title></Helmet>
                <Header data-fancy>
                    <Title>{t.s('recoverPassword')}</Title>
                </Header>

                <Layout>
                    <Label>{t.s('newPassword')}</Label>
                    <Text
                        autoFocus
                        type='password'
                        name='password'
                        disabled={status=='loading'}
                        required
                        value={this.state.password}
                        onChange={this.onChangeValue} />

                    <Buttons>
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
                                value={t.s('changePassword')} />
                            )}

                        <Button
                            as={Link}
                            variant='outline'
                            data-block
                            to='/account/login'>
                            {t.s('cancel')}
                        </Button>
                    </Buttons>
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
    { recoverPassword }
)(AccountRecover)