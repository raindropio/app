import React from 'react'
import DocumentTitle from 'react-document-title'

import Icon from '~icon'
import Api from '~api'
import t from '~t'
import initAuth from '../helpers/initAuth'
import UserStore from '../stores/user'

import Sidebar from './sidebar'
import SidebarTabBar from './sidebar/tabBar'
import Panel from './sidebar/panel'
import Reader from './reader'
import Preloader from '../co/common/preloader'
import LayoutWrap from '../co/columns/layoutWrap'
import CustomDragPreview from '../co/common/customDragPreview'

var loginStep, correctStepCount, alreadyLoaded = false;

class Layout extends React.Component {
	displayName = "app/index"

	timeout = null

	constructor(props) {
		super(props);

		this.refresh = this.refresh.bind(this);

		this.state = {
			status: "loading"
		}
	}

	componentWillMount() {
		if (typeof document === 'undefined') return;

		initAuth.checkStatus((status)=>{
			if (status=="needLogin")
				UserStore._redirectToLogin();
			else
				this.setState({status: status})
		})
	}

	refresh() {
		window.location.reload();
	}

	render() {
		switch(this.state.status){
			case "loading":
				return (
					<div>
						<DocumentTitle title={t.s("loading")+"..."} />

						<aside id="sidebar" className="disable-transition">
							<header>
								<div className="headerWrap">
									<div className="sidebarHeaderTitle">
										<Icon name="raindrop_logo" className="raindropLogo" />
									</div>

									{/*<Preloader className="size-medium" />&nbsp;*/}
								</div>
							</header>

							<div id="sidebarContent">
								<section>
									<div className="collection placeholder" />
									<div className="collection placeholder small" />
								</section>

								<section>
									<div className="group placeholder" />
									<div className="collection placeholder" />
								</section>
							</div>
							{alreadyLoaded ? <SidebarTabBar active="" /> : null}
						</aside>

						<section id="main">
							<div className="centerContentWrap"><div className="centerContent">
								<Preloader/>
							</div></div>
						</section>
					</div>
				);
			break;

			case "error":
				return (<div className="centerContentWrap"><div className="centerContent"><div>
					<DocumentTitle title={t.s("server")} />

					<h2 className="headLabel">{t.s("server")}</h2>
					<p className="subHeadLabel">
						{t.s("noInternetError")}<br />
						<a href="#/" onClick={this.refresh}>{t.s("refresh")}</a>
					</p>
					
				</div></div></div>);
			break;

			default:
				return (
					<div>
						<DocumentTitle title="Raindrop.io" />

						<Sidebar />
						<Panel />

						{this.props.children}

						<Reader />
						<CustomDragPreview />
					</div>
				);
			break;
		}
	}
}

export default LayoutWrap(Layout)