import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { userStatus, errorReason } from '~data/selectors/user'
import { lostPassword } from '~data/actions/user'

import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Layout, Label, Text, Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Preloader from '~co/common/preloader'
import Header, { Title } from '~co/common/header'
import { Error } from '~co/overlay/dialog'

class AccountLost extends React.Component {
    state = {
        email: ''
    }

    componentDidUpdate(prev) {
        if (prev.error.lost != this.props.error.lost)
            Error(this.props.error.lost)
    }

    onChangeValue = (e)=>
        this.setState({[e.target.name]: e.target.value})

    onSubmit = (e)=>{
        e.preventDefault()
        
        this.props.lostPassword(this.state)
    }

    render() {
        const status = this.props.status.lost

        if (status == 'success')
            return (
                <Layout>
                    <Header data-fancy>
                        <Title>{t.s('checkYourEmail')}</Title>
                    </Header>

                    <Button
                        as={Link}
                        variant='outline'
                        data-block
                        to='/account/login'>
                        {t.s('signIn')}
                    </Button>
                </Layout>
            )

        return (
            <form onSubmit={this.onSubmit}>
                <Helmet><title>{t.s('recoverPassword')}</title></Helmet>
                <Header data-fancy>
                    <Title>{t.s('recoverPassword')}</Title>
                </Header>

                <Layout>
                    <Label>Email</Label>
                    <Text
                        type='email'
                        name='email'
                        disabled={status=='loading'}
                        autoFocus
                        required
                        value={this.state.email}
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
                                value={t.s('recoverPassword')} />
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
    { lostPassword }
)(AccountLost)