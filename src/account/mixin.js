import React from 'react'
import Icon from '~icon'
import t from '~t'
import Api from '~api'
import isURL from 'validator/es/lib/isURL'
import environment from '../helpers/environment'
import config from '../modules/config'

import CollectionsStore from '../stores/collections'
import UserStore from '../stores/user'

var resized = false;

export default function(Component) {
	return class AccountMixin extends React.Component {
		displayName = "account/mixin"

		constructor(props) {
			super(props);

			this.state = {
				loading: true
			}
		}

		componentDidMount() {
			if (!resized)
				setTimeout(()=>{environment.resizeWindow(400,550);resized=true},50);
			setTimeout(()=>this.setState({loading:false}),150);
		}

		messageFromWindow(data, from) {
			if (((data.action||"") == "raindrop-loggedIn") || (from=="electron"))
				this.redirectLogged()
		}

		getRedirectURL = ()=>{
			if (this.props.location.query &&
				this.props.location.query.redirect &&
				isURL(this.props.location.query.redirect, {
					require_host: false, 
					host_whitelist: ['raindrop.io', /\.raindrop\.io$/]
				}))
				return new URL(this.props.location.query.redirect, location.href).toString()
		}

		getAdditionalQueryString = ()=>{
			var redirect = this.getRedirectURL()

			if (redirect)
				return `?redirect=${encodeURIComponent(redirect)}`

			return ''
		}

		redirectIfLogged() {
			setTimeout(()=>{
				Api.get('user',(json)=>{
					if (json.result)
						this.redirectLogged()
				})
			},2000);
		}

		redirectLogged = ()=>{
			UserStore.reset();
			
			UserStore._cleanCache(()=>{
				environment.resizeWindow();

				CollectionsStore.reset();

				var redirectURL = this.getRedirectURL()

				if (redirectURL)
					window.location.href = redirectURL
				else{
					window.location.hash = "#/";
					window.location.reload();
				}
			})
		}

		renderSocial = (onLoad,onClose,onMessage)=>{
			var openModal = (e)=>{
				if (environment.isDesktop()){
					e.preventDefault()

					onLoad();

					var w = environment.openWindow({
						url: `${e.target.href}?redirect=${encodeURIComponent('https://raindrop.io/other/modal-login.html')}`,
						name: "social",
						w: 700,
						h: 600,
						showOnLoad: true,
						userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A366 Safari/600.1.4",
						onClose: onClose,
						onMessage: onMessage
					});
				}
			}

			return (
				<div className="additionalButtonWrap socialLoginWrap">
					<a className="button default standart google" href={`${config.apiPrefix}auth/google${this.getAdditionalQueryString()}`} onClick={openModal}><b style={{pointerEvents: 'none'}}><Icon name="google" /></b></a>
					<a className="button default standart apple" href={`${config.apiPrefix}auth/apple${this.getAdditionalQueryString()}`} onClick={openModal}><b style={{pointerEvents: 'none'}}><Icon name="apple_active" /></b></a>

					<a className="button default standart facebook" href={`${config.apiPrefix}auth/facebook${this.getAdditionalQueryString()}`} onClick={openModal}><b style={{pointerEvents: 'none'}}><Icon name="facebook" /></b></a>
					<a className="button default standart twitter" href={`${config.apiPrefix}auth/twitter${this.getAdditionalQueryString()}`} onClick={openModal}><b style={{pointerEvents: 'none'}}><Icon name="twitter" /></b></a>
					<a className="button default standart vk" href={`${config.apiPrefix}auth/vkontakte${this.getAdditionalQueryString()}`} onClick={openModal}><b style={{pointerEvents: 'none'}}><Icon name="vk" /></b></a>
				</div>
			);
		}

		renderLinks() {
			return [
				<span key="emptySeparator">&nbsp;&times;&nbsp;</span>,
				<a key="help" href="https://help.raindrop.io/" target="_blank" className="button active">{t.s("help")}</a>
			]
		}

		render() {
			if (this.state.loading) return null;

			return (
				
					<Component
						{...this.props}
						messageFromWindow={this.messageFromWindow.bind(this)}
						renderSocial={this.renderSocial}
						redirectLogged={this.redirectLogged}
						redirectIfLogged={this.redirectIfLogged}
						renderLinks={this.renderLinks}
						getAdditionalQueryString={this.getAdditionalQueryString}
						getRedirectURL={this.getRedirectURL} />
				
				
			);
		}
	}
}