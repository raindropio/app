import s from './_page/index.module.styl'
import React from 'react'
import { Helmet } from 'react-helmet'
import t from '~t'

import Button from '~co/common/button'
import withPage from './_page'
import Error from './error'

class AccountLost extends React.Component {
    state = {
        email: ''
    }

    onChangeValue = (e)=>
        this.setState({[e.target.name]: e.target.value})

    onSubmit = (e)=>{
        e.preventDefault()
        
        this.props.lostPassword(this.state)
    }

    render() {
        const status = this.props.status.lost
        const error = this.props.error.lost

        if (status == 'success')
            return (
                <div>
                    <h2>{t.s('checkYourEmail')}</h2>
                </div>
            )

        return (
            <form onSubmit={this.onSubmit}>
                <Helmet><title>{t.s('recoverPassword')}</title></Helmet>
                <h1>{t.s('recoverPassword')}</h1><br/>

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

                <div className={s.buttons}>
                    <Button
                        Tag='input' 
                        type='submit'
                        disabled={status=='loading'}
                        variant='primary'
                        data-block
                        value={t.s('recoverPassword')} />
                </div>
            </form>
        )
    }
}

export default withPage(AccountLost)