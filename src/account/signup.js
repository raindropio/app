import React from 'react'
import DocumentTitle from 'react-document-title'
import t from '~t'
import Icon from '~icon'
import Api from '~api'

import SuperImg from '../co/common/superImg'
import Tabs from '../co/common/tabs'
import Preloader from '../co/common/preloader'
import Toasts from '../actions/toast'
import Pop from '../actions/pop'

import AccountMixin from './mixin'

class AccountSignup extends React.Component {
	displayName = "account/signup"

	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			social: true,
			fullName: "",
			email: "",
			password: ""
		}
	}

	renderSocial() {
		if (this.state.social)
			return this.props.renderSocial(()=>this.setState({loading: true}), ()=>{this.setState({loading: false}); this.props.redirectIfLogged()}, this.props.messageFromWindow);
		else
			return (
				<div className="additionalButtonWrap socialLoginWrap">
					<a className="button standart" onClick={(e)=>{e.preventDefault();this.setState({social: true})}}>{t.s("signUpSocial")} Facebook, Twitter, Google {t.s("or")} VK</a>
				</div>
			)
	}

	handleLogin(e) {
		e.preventDefault();
		Pop.show('loading');

		Api.post("user", {
			fullName: this.state.fullName,
			email: this.state.email,
			password: this.state.password
		}, (json) => {
			if (json.result === true)
				Api.post("auth/login", {
					email: this.state.email,
					password: this.state.password
				}, (json)=> {
					if (json.result === true)
						this.props.redirectLogged();
					else{
						Toasts.show({text: t.s("server7"), status:"error"});
					}

					Pop.close();
				});
			else{
				Toasts.show({text: t.s("server"+json.error), status:"error"});
				Pop.close();
			}
		});
	}

	render() {
		return (
			<div className="centerContentWrap accountPage">
				<DocumentTitle title={t.s("signUp")+' - Raindrop.io'} />
				
				<div className="centerContent">
					<form className="centerContentBlock" ref="form" onSubmit={this.handleLogin.bind(this)}>
						<div className="dots"><span/><span/><span/><span/><span/><span/></div>
						<div className="accountLogo"><SuperImg src="marketing/logoIcon.png" height="72" /></div>

						<h1 className="headLabel">{t.s("startCollecting")}</h1><br/>

						<input type="text" name="fullName" autoFocus autoComplete="false" required placeholder={t.s("yourName")} value={this.state.fullName} onChange={(e)=>this.setState({fullName:e.target.value})} />
						<input type="email" name="email" autoComplete="false" required placeholder="Email" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} />
						<input type="password" name="password" autoComplete="new-password" required placeholder={t.s("password")} value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})} />

						<div className="additionalButtonWrap">
							<input type="submit" className="button active standart loginButton input" value={t.s("register")} />
						</div>

						<div className="acceptLicence">
							{t.s("privacyTerms")} <a href="https://help.raindrop.io/terms" target="_blank">{t.s("termsOfService")}</a> {t.s("und")} <a href="https://help.raindrop.io/privacy" target="_blank">{t.s("privacyPolicy")}</a>
						</div>
						
						<div className="line"/>

						<div className="acceptLicence">
							{t.s('or')} {t.s('loginOrRegisterSocial').toLowerCase()}
						</div>
						{this.renderSocial()}

					</form>

					<div className="otherLogin">
						<a href={"#/account/reset"+this.props.getAdditionalQueryString()} className="button active">{t.s("recoverPassword")}</a>
						&nbsp;
						&times;
						&nbsp;
						<a href={"#/account/login"+this.props.getAdditionalQueryString()} className="button active">{t.s("signIn")}</a>

						
						{this.props.renderLinks()}
					</div>
				</div>
			</div>
		);
	}
}

export default AccountMixin(AccountSignup)