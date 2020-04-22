import React from 'react'
import Icon from 'icon'
import t from 't'
import UserStore from '../../stores/user'

import settingsHelpers from '../parts/helpers'
import MainWrap from '../../co/columns/mainWrap'
import Dropbox from './dropbox'
import Gdrive from './gdrive'
import Link from './link'

class Main extends React.Component {
	displayName = "settings/integrations"

	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
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
			user: user,
			loading: false
		});
	}

	render() {
		var dropbox = false, gdrive = false;
		try{dropbox=this.state.user.dropbox.enabled;}catch(e){}
		try{gdrive=this.state.user.gdrive.enabled;}catch(e){}

		return (
			<section id="main">
				<header className="no-border">
					<div className="headerWrap">
						{settingsHelpers.backButton.bind(this)()}
						
						<h1 className="min">{t.s("integrations")}</h1>
					</div>
				</header>

				<div id="mainBody">
					<div className="blocks-container">
						<Link title='IFTTT' subtitle='Connect to 600 apps, RSS and Email' icon='ifttt' color='' href='https://ifttt.com/raindrop' />
						<Link title='Zapier' subtitle='Connect to 2,000 business apps' icon='zapier' color='#FF4A00' href='https://zapier.com/apps/raindropio' />

						<Dropbox enabled={dropbox} pro={UserStore.isPro()} />
						<Gdrive enabled={gdrive} pro={UserStore.isPro()} />
					</div>
				</div>
			</section>
		);
	}
}

export default MainWrap(Main)