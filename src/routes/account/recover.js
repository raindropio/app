import React from 'react'
import { Helmet } from 'react-helmet'
import t from '~t'

import { Layout, Text } from '~co/common/form'
import Button from '~co/common/button'
import Preloader from '~co/common/preloader'
import Header, { Title } from '~co/common/header'
import withPage from './_page'
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
                <Helmet><title>{t.s('newPassword')}</title></Helmet>
                <Header data-no-shadow>
                    <Title>{t.s('newPassword')}</Title>
                </Header>

                <Layout>
                    <Text
                        type='password'
                        name='password'
                        disabled={status=='loading'}
                        required
                        placeholder={t.s('password')}
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
                            value={t.s('changePassword')} />
                        )}
                </Layout>
            </form>
        )
    }
}

export default withPage(AccountRecover)