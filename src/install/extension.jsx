import React from 'react'
import t from 't'
import Icon from 'icon'
import strings from '../modules/strings'
import config from 'config'
import settingsHelpers from './parts/helpers'

import MainWrap from '../co/columns/mainWrap'

var _ = {
  capitalize: require('lodash/capitalize')
}

class Main extends React.Component {
	displayName: "install/home"

	constructor(props) {
		super(props);

		this.state = strings.browserExtensionInfo();
	}

	renderBrowser = (name)=>(
		<a 
			key={name}
			className={'button standart '+(this.state.browser == name ? 'active' : 'default')}
			href={config.links.extension[name]}
			target='_blank'>
			<b>{_.capitalize(name)}</b>
		</a>
	)

	render() {
		console.log(this.state.browser)
		return (
			<section id="main" className="installExtensionPage">
				<header className="no-border">
					<div className="headerWrap">
						{settingsHelpers.backButton.bind(this)()}
						<h1 className="min">{t.s("browserExtension")}</h1>
					</div>
				</header>

				<div id="mainBody"><div className="centerContentWrap desktop-behavior">
					<div className="centerContent">
						<div className="centerContentBlock">
							<h1 className="extraHeadLabel">{t.s("welcomeSlide2D")} {t.s("welcomeSlide2DD")}</h1>
							
							{Object.keys(config.links.extension).map(this.renderBrowser)}
						</div>
					</div>
				</div></div>

				<div className="promoScreen">
					<div className="video">
						<video src="https://up.raindrop.io/web/marketing/extension.mp4" preload="true" autoPlay loop></video>
					</div>
				</div>
			</section>
		);
	}
}

export default MainWrap(Main)