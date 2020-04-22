import React from 'react'
import ReactDom from 'react-dom'
import Icon from 'icon'
import t from 't'
import config from 'config'
import network from 'network'
import Api from 'api'

import settingsHelpers from './parts/helpers'
import ResetAccount from './parts/reset'

import Toasts from '../actions/toast'

import MainWrap from '../co/columns/mainWrap'

class Main extends React.Component {
	displayName: "settings/profile"

	constructor(props) {
		super(props);
		this.state = {
			loading: true
		}
	}

	componentDidMount() {
		this.unsubscribeUser = UserStore.listen(this.onUserChange.bind(this));

		UserStore.onLoad((result)=>{
			if (!result)
				UserStore._redirectToLogin();

			var emailPassword = ReactDom.findDOMNode(this.refs.emailPassword);
			if (emailPassword) emailPassword.value="";
		});
	}

	componentWillUnmount() {
        this.unsubscribeUser();
    }

	onUserChange(user) {
		this.setState({
			email: user.email,
			fullName: user.fullName,
			password: user.password,
			loading: false
		});
	}

	handleSave(e) {
		e.preventDefault();
		var update = {fullName: this.state.fullName};
		if (this.state.email) {
			update.email = this.state.email;

			if (!this.state.password){
    			update.newpassword = this.state.newpassword;
    		}
		}

		this.setState({loading: true});

    	Api.put("user", update, function(json) {
    		if (json.result){
    			Toasts.show({text: t.s('saveSuccess')});
    			window.location.reload();
    		}
    		else{
    			Toasts.show({text: t.s('server'+json.error), status: "error"});
    			UserStore.reset();
    			UserStore.onLoad();
    		}
    	});
	}

	handleChangePassword(e) {
    	e.preventDefault();
    	var update = {
    		oldpassword: this.state.currentpassword,
    		newpassword: this.state.newpassword,
    		email: this.state.email,
    		fullName: this.state.fullName
    	}, _this = this;

    	this.setState({loading:true});
    	Api.put("user", update, function(json) {
    		if (json.result){
    			Toasts.show({text: t.s('saveSuccess')});
    			window.location.reload();
    		}
    		else{
    			Toasts.show({text: t.s('server'+json.error), status: "error"});
	    		UserStore.reset();
	    		UserStore.onLoad();
	    	}
    	});
    }

    handleRemove() {
    	if (confirm(t.s("removeAccountD")))
    		window.location = config.apiPrefix+'user-remove';
    }

	renderBody() {
		if (this.state.loading) return null;

		var emailPassword, changePassword;
		if (!this.state.password)
			emailPassword = (
				<figure className="fieldWrap">
					<label className="fieldName" htmlFor="emailPassword">{t.s("password")}</label>
					<input type="password"
							ref="emailPassword"
							id="emailPassword"
							className="field"
							required={true}
							autoComplete="new-password"
							name="email-password"
							onChange={(e)=>this.setState({newpassword: e.target.value})} />
				</figure>
			);
		else
			changePassword = (
				<form className="superForm" onSubmit={this.handleChangePassword.bind(this)} autoComplete="off">
					<figure className="fieldWrap">
						<label className="fieldName" htmlFor="currentPassword">{t.s("changePassword")}</label>

						<input type="password"
								ref="currentPassword"
								id="currentPassword"
								className="field"
								required={true}
								autoComplete="old-password"
								name="old-password"
								placeholder={t.s("currentPassword")}
								onChange={(e)=>this.setState({currentpassword: e.target.value})} />
					</figure>

					<figure className="fieldWrap">
						<input type="password"
								ref="newPassword"
								id="newPassword"
								className="field"
								required={true}
								autoComplete="new-password"
								name="new-password"
								placeholder={t.s("newPassword")}
								onChange={(e)=>this.setState({newpassword: e.target.value})} />
					</figure>

					<figure className="fieldColumns">
						<input type="submit" className="button active standart loginButton input" value={t.s("changePassword")} />
					</figure>
				</form>
			);

		return (
			<div id="mainBody">
				<form className="superForm" onSubmit={this.handleSave.bind(this)} autoComplete="off">
					<figure className="fieldWrap">
						<label className="fieldName" htmlFor="yourName">{t.s("yourName")}</label>
						<input type="text"
								id="yourName"
								className="field"
								required={true}
								value={this.state.fullName||""}
								onChange={(e)=>this.setState({fullName: e.target.value})}
								autoComplete="off" />
					</figure>

					<figure className="fieldWrap">
						<label className="fieldName" htmlFor="email">Email</label>
						<input type="email"
								id="email"
								className="field"
								required={true}
								value={this.state.email||""}
								onChange={(e)=>this.setState({email: e.target.value})}
								autoComplete="off" />
					</figure>

					{emailPassword}

					<figure className="fieldColumns">
						<input type="submit" className="button active standart loginButton input" value={t.s("saveChanges")} />
					</figure>
				</form>

				<br />
				{changePassword}

				<br />
				<ResetAccount />
				<br />
				<a className="button default" onClick={this.handleRemove.bind(this)}>{t.s("removeAccount")}</a>
			</div>
		);
	}

	render() {
		return (
			<section id="main">
				<header>
					<div className="headerWrap">
						{settingsHelpers.backButton.bind(this)()}
						<h1 className="min">{t.s("profile")}</h1>
					</div>
				</header>

				{this.renderBody()}
			</section>
		);
	}
}

export default MainWrap(Main)