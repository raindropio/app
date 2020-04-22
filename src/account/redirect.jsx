import React from 'react'
import t from 't'
import environment from '../helpers/environment'
import initAuth from '../helpers/initAuth'
import Preloader from '../co/common/preloader'

export default class AccountRedirect extends React.Component {
	displayName: "account/redirect"
	checked: false

	componentDidMount() {
		setTimeout(()=>document.body.addEventListener('mouseover', this.mouseOver),300);
	}

	mouseOver = ()=>{
		if (this.checked) return;

		this.checked = true;
		initAuth.checkStatus((status)=>{
			switch(status){
				case "needLogin":
				case "error":
				case "done":
					var redirectURL = this.props.getRedirectURL()
					if (redirectURL)
						window.location.href = redirectURL
					else
						window.location.hash = '#/'
				break;
			}
		});
	}

	render() {
		return (
			<div className="centerContentWrap">
				<div className="centerContent" style={{flexDirection:"column"}}>
					<Preloader />
					<a className="button active" href={this.props.getRedirectURL() || '#/'}>{t.s("cancel")}</a>
				</div>
			</div>
		);
	}
}