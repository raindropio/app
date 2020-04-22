import React from 'react'
import Icon from 'icon'
import t from 't'
import config from 'config'

import settingsHelpers from './parts/helpers'

import MainWrap from '../co/columns/mainWrap'
import SuperImg from '../co/common/superImg'

class Main extends React.Component {
	displayName: "settings/import"

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
		});
	}

	componentWillUnmount() {
        this.unsubscribeUser();
    }

    onUserChange(user) {
		this.setState({
			email: user.email,
			fullName: user.fullName,
			loading: false
		});
	}

	render() {
		var content;

		if (this.state.loading)
			content = (<div className="centerContentWrap desktop-behavior"><div className="centerContent"><div className="centerContentBlock">
				{t.s('loading')}
			</div></div></div>);

		return (
			<section id="main">
				<header className="no-border">
					<div className="headerWrap">
						{settingsHelpers.backButton.bind(this)()}
						<h1 className="min">{t.s("importBookmarks")}&nbsp;{t.s("elements2")}</h1>
					</div>
				</header>

				<div id="mainBody" style={{minHeight:"70%"}}>
					{this.props.children||content}
				</div>

				<div className="promoScreen">
					<SuperImg src="empty/export.png" className="animation-flying" width="455" />
				</div>
			</section>
		);
	}
}

export default MainWrap(Main)