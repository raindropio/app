import React from 'react'
import { API_ENDPOINT_URL } from '~data/constants/app'
import Icon from '~co/common/icon'
import environment from '~modules/environment'

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
            <div className='additionalButtonWrap socialLoginWrap'>
                {['google', 'apple', 'facebook', 'twitter', 'vkontakte'].map(vendor=>(
                    <a 
                        key={vendor}
                        className={'button  standart '+vendor}
                        href={`${API_ENDPOINT_URL}auth/${vendor}${this.props.uriSuffix}`}
                        onClick={this.openModal}>
                        <b style={{pointerEvents: 'none'}}>
                            <Icon name={vendor} />
                        </b>
                    </a>
                ))}
            </div>
        )
    }
}