import s from './_page/index.module.styl'
import React from 'react'
import { Helmet } from 'react-helmet'
import t from '~t'

import Button from '~co/common/button'
import withPage from './_page'
import Error from './error'

class AccountRecover extends React.Component {
    state = {
        password: ''
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
        const error = this.props.error.recover

        return (
            <form onSubmit={this.onSubmit}>
                <Helmet><title>{t.s('newPassword')}</title></Helmet>
                <h1>{t.s('newPassword')}</h1><br/>

                {status == 'error' && <Error error={error} />}

                <input
                    type='password'
                    name='password'
                    disabled={status=='loading'}
                    required
                    placeholder={t.s('password')}
                    value={this.state.password}
                    onChange={this.onChangeValue} />

                <div className={s.buttons}>
                    <Button
                        Tag='input' 
                        type='submit'
                        disabled={status=='loading'}
                        variant='primary'
                        data-block
                        value={t.s('changePassword')} />
                </div>
            </form>
        )
    }
}

export default withPage(AccountRecover)