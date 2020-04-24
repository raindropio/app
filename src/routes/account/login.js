import React from 'react'
import { Helmet } from 'react-helmet'
import t from '~t'
import Icon from '~icon'
import Api from '~api'

import SuperImg from '~co/common/superImg'
import Toasts from '~actions/toast'
import Pop from '~actions/pop'

import AccountMixin from './mixin'

class AccountLogin extends React.Component {
	displayName = 'account/login'

	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			email: '',
			password: ''
		}
	}

	renderSocial() {
		return this.props.renderSocial(
			()=>this.setState({loading: true}), 
			()=>{
				this.setState({loading: false});
				this.props.redirectIfLogged()
			},
			this.props.messageFromWindow
		)
	}

	handleLogin(e) {
		e.preventDefault();
		
		Pop.show('loading');

		Api.post('auth/login', {
			email: this.state.email,
			password: this.state.password
		}, (json)=> {
			if (json.result === true)
				this.props.redirectLogged();
			else{
				Toasts.show({text: t.s('server7'), status:'error'});
			}

			Pop.close();
		});
	}

	render() {
		return (
			<div className='centerContentWrap accountPage'>
				<Helmet><title>{t.s('signIn')}</title></Helmet>

				<div className='centerContent'>
					<form className='centerContentBlock' onSubmit={this.handleLogin.bind(this)}>
						<div className='dots'><span/><span/><span/><span/><span/><span/></div>
						<div className='accountLogo'><SuperImg src='marketing/logoIcon.png' height='72' /></div>
						<Icon name='raindrop_logo' className='raindropLogo' />

						<input type='email' name='email' autoFocus required placeholder='Email' value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} />
						<input type='password' name='password' required placeholder={t.s('password')} value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})} />

						<div className='additionalButtonWrap'>
							<input type='submit' className='button default standart loginButton input' value={t.s('signIn')} />
						</div>

						<br />
						<div className='acceptLicence'>
							{t.s('or')} {t.s('loginOrRegisterSocial').toLowerCase()}
						</div>
						{this.renderSocial()}
					</form>

					<div className='otherLogin'>
						<a href={'#/account/reset'+this.props.getAdditionalQueryString()} className='button active'>{t.s('recoverPassword')}</a>
						&nbsp;
						&times;
						&nbsp;
						<a href={'#/account/signup'+this.props.getAdditionalQueryString()} className='button active'>{t.s('signUp')}</a>

						{this.props.renderLinks()}
					</div>
				</div>
			</div>
		);
	}
}

export default AccountMixin(AccountLogin)