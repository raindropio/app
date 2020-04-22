import React from 'react'
import DocumentTitle from 'react-document-title'
import t from '~t'
import Icon from '~icon'
import Api from '~api'
import environment from '../../helpers/environment'

import SuperImg from '../../co/common/superImg'
import AccountMixin from '../mixin'
import initAuth from '../../helpers/initAuth'

class Welcome extends React.Component {
	displayName = "account/welcome"

	constructor(props) {
		super(props);

		this.state = {
			page: 0,
			price: 0
		}
	}

	componentDidMount() {
		Api.get('https://billing.raindrop.io/v1/info/pricing', (json)=>{
			this.setState({price: "$" + parseInt(json.pricing['1'].price) + "/" + t.s("month")})
		})

		initAuth.checkStatus((status)=>{
			switch(status){
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

	nextPage(e) {
		e.preventDefault();
		this.setState({page: this.state.page+1})
	}

	renderPage(page) {
		switch(page) {
			case 0:
				var title = t.s('welcome')+"&nbsp;Raindrop.io";

				return (
					<div key="slide1" className="welcomePage translateFromLeftSlightly">
						<div key="img1" className="welcomeClipperImage"><SuperImg src="welcome/clipper1.png" /></div>

						<div className="welcomeMessage">
							<h1 dangerouslySetInnerHTML={{__html: title}}></h1>

							<ul className="welcomeFeatures">
								<li>
									<Icon name="like" />
									<p>{t.s("welcomeSlide1D")}</p>
								</li>

								<li>
									<Icon name="duplicates" />
									<p>{t.s("dragImages")}</p>
								</li>

								<li>
									<Icon name="cloud" />
									<p>{t.s("syncWithApps")}</p>
								</li>
							</ul>

							<div className="additionalButtonWrap">
								<a className="button default standart small" onClick={this.nextPage.bind(this)}><b>{t.s("next")}</b></a>
							</div>
						</div>
					</div>
				);
			break;

			case 1:
				var searchTitle = t.s("defaultCollection-0")+" "+t.s("smartSearchD").toLowerCase();
	
				return (
					<div key="slide2" className="welcomePage translateFromLeftSlightly">
						<div key="img2" className="welcomeClipperImage wci2"><SuperImg src="welcome/clipper2.png" /></div>

						<div className="welcomeMessage">
							<h1 dangerouslySetInnerHTML={{__html: t.s("downloadTitle")}}></h1>

							<ul className="welcomeFeatures">
								<li>
									<Icon name="search" />
									<p>{searchTitle}</p>
								</li>

								<li>
									<Icon name="24_home_active" />
									<p>{t.s("welcomeSlide1DD")}</p>
								</li>

								<li>
									<Icon name="sharing" />
									<p>{t.s("shareCollaborate")}</p>
								</li>
							</ul>

							<div className="additionalButtonWrap">
								<a href={"#/account/login"+this.props.getAdditionalQueryString()} className="button default standart"><b>{t.s("signIn")}</b></a>
								<a href={"#/account/signup"+this.props.getAdditionalQueryString()} className="button active standart"><b>{t.s("register")}</b></a>
							</div>

							{/*<br /><br />
							
							<p className="subHeadLabel">
								{t.s("free")+' '+t.s("or")+' '}
								<a href="https://raindrop.io/static/pro" target="_blank">{this.state.price}</a>
							</p>*/}
							
						</div>
					</div>
				);
			break;
		}
	}

	render() {
		return (
			<div className="centerContentWrap accountPage">
				<DocumentTitle title={'Raindrop.io'} />

				<div className="centerContent">
					{this.renderPage(this.state.page)}
				</div>
			</div>
		);
	}
}

export default AccountMixin(Welcome)