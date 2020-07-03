import React from 'react'
import { Helmet } from 'react-helmet'
import t from '~t'

import { Layout, Text } from '~co/common/form'
import Button from '~co/common/button'
import Preloader from '~co/common/preloader'
import Header, { Title } from '~co/common/header'
import withPage from './_page'
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
                <div>
                    <h2>{t.s('checkYourEmail')}</h2>
                </div>
            )

        return (
            <form onSubmit={this.onSubmit}>
                <Helmet><title>{t.s('recoverPassword')}</title></Helmet>
                <Header data-no-shadow>
                    <Title>{t.s('recoverPassword')}</Title>
                </Header>

                <Layout>
                    <Text
                        type='email'
                        name='email'
                        disabled={status=='loading'}
                        autoFocus
                        required
                        placeholder='Email'
                        value={this.state.email}
                        onChange={this.onChangeValue} />

                    {status == 'loading' ? (
                        <Button variant='flat' data-block>
                            <Preloader />
                        </Button>
                    ) : (
                        <Button
                            Tag='input' 
                            type='submit'
                            variant='primary'
                            data-block
                            value={t.s('recoverPassword')} />
                    )}
                </Layout>
            </form>
        )
    }
}

export default withPage(AccountLost)