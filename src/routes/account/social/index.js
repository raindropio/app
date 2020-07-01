import s from './index.module.styl'
import React from 'react'
import t from '~t'
import { API_ENDPOINT_URL } from '~data/constants/app'
import environment from '~modules/environment'

import { Layout, Label } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default class AccountSocialLogin extends React.Component {
    openModal = (e)=>{
        if (environment.isDesktop()){
            e.preventDefault()

            environment.openWindow({
                url: `${e.target.href}?redirect=${encodeURIComponent('https://raindrop.io/other/modal-login.html')}`,
                name: 'social',
                w: 700,
                h: 600,
                showOnLoad: true,
                userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A366 Safari/600.1.4',
                onClose: ()=>
                    location.hash='/'
            })
        }
    }

    render() {
        return (
            <Layout className={s.social}>
                <Label>{t.s('loginOrRegisterSocial')}</Label>

                <div className={s.buttons}>
                    {['google', 'apple', 'facebook', 'twitter', 'vkontakte'].map(vendor=>(
                        <Button 
                            key={vendor}
                            className={s[vendor]}
                            variant='outline'
                            data-block
                            href={`${API_ENDPOINT_URL}auth/${vendor}${this.props.uriSuffix}`}
                            onClick={this.openModal}>
                            <Icon name={vendor} />
                        </Button>
                    ))}
                </div>
            </Layout>
        )
    }
}