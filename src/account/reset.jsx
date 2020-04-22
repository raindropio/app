import React from 'react'
import DocumentTitle from 'react-document-title'
import t from 't'
import Icon from 'icon'
import Api from 'api'

import SuperImg from '../co/common/superImg'
import Tabs from '../co/common/tabs'
import Preloader from '../co/common/preloader'
import Toasts from '../actions/toast'
import Pop from '../actions/pop'

import AccountMixin from './mixin'

class AccountReset extends React.Component {
	displayName = "account/reset"

	constructor(props) {
		super(props);

		this.state = {
			step: "",
			email: ""
		}
	}

	handleReset(e) {
		e.preventDefault();
		Pop.show('loading');

		Api.post("lostPassword", {
			email: this.state.email
		}, (json)=> {
			if (json.result === true)
				this.setState({step: "done"});
			else{
				Toasts.show({text: json.errorMessage || t.s("server7"), status:"error"});
				this.setState({step: ""});
			}

			Pop.close();
		});
	}

	render() {
		switch(this.state.step){
			case "done":
				return (
					<div className="centerContentWrap"><div className="centerContent"><div>
						<h2 className="headLabel">{t.s("checkYourEmail")}</h2>
						<p className="subHeadLabel">
							<a href={"#/account/login"+this.props.getAdditionalQueryString()}>{t.s("signIn")}</a>
						</p>
					</div></div></div>
				);
			break;
		}

		return (
			<div className="centerContentWrap accountPage">
				<DocumentTitle title={t.s("recoverPassword")+' - Raindrop.io'} />

				<div className="centerContent">
					<form className="centerContentBlock" onSubmit={this.handleReset.bind(this)}>
						<div className="dots"><span/><span/><span/><span/><span/><span/></div>
						<div className="accountLogo"><SuperImg src="marketing/logoIcon.png" height="72" /></div>

						<h1 className="headLabel">{t.s("recoverPassword")}</h1><br/>

						<input type="email" name="email" autoFocus required placeholder="Email" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} />

						<div className="additionalButtonWrap">
							<input type="submit" className="button default standart loginButton input" value={t.s("recoverPassword")} />
						</div>
					</form>

					<div className="otherLogin">
						<a href={"#/account/login"+this.props.getAdditionalQueryString()} className="button active">{t.s("signIn")}</a>
						&nbsp;
						&times;
						&nbsp;
						<a href={"#/account/signup"+this.props.getAdditionalQueryString()} className="button active">{t.s("signUp")}</a>

						{this.props.renderLinks()}
					</div>
				</div>
			</div>
		);
	}
}

export default AccountMixin(AccountReset)