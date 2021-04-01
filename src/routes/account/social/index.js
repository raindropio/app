import s from './index.module.styl'
import React from 'react'
import { API_ENDPOINT_URL } from '~data/constants/app'

import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default class AccountSocialLogin extends React.Component {
    state = {
        all: false
    }

    onShowAllClick = () =>
        this.setState({ all: true })

    render() {
        const { all } = this.state
        const redirect = (window.sessionStorage && window.sessionStorage.getItem('redirect')) || ''

        return (
            <div className={s.buttons}>
                {['google', 'apple', ...(all ? ['facebook', 'twitter', 'vkontakte'] : [])].map(vendor=>(
                    <Button 
                        key={vendor}
                        className={s[vendor]}
                        variant='outline'
                        disabled={this.props.disabled}
                        data-block
                        href={`${API_ENDPOINT_URL}auth/${vendor}?redirect=${encodeURIComponent(redirect)}`}>
                        <Icon name={vendor} />
                    </Button>
                ))}
                
                {!all && (
                    <Button
                        variant='outline'
                        data-block
                        disabled={this.props.disabled}
                        onClick={this.onShowAllClick}>
                        <Icon name='more_horizontal' />
                    </Button>
                )}
            </div>
        )
    }
}