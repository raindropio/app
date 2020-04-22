import React from 'react'
import config from 'config'
import t from 't'
import Icon from 'icon'
import settingsHelpers from './parts/helpers'

import SuperImg from '../co/common/superImg'
import MainWrap from '../co/columns/mainWrap'

class Main extends React.Component {
	displayName: "install/ios"

	render() {
		return (
			<section id="main">
				<header className="no-border">
					<div className="headerWrap">
						{settingsHelpers.backButton.bind(this)()}
						<h1 className="min">{t.s("mobileApp")}</h1>
					</div>
				</header>

				<div id="mainBody"><div className="centerContentWrap desktop-behavior">
					<div className="centerContent">
						<div className="centerContentBlock">
							<h1 className="extraHeadLabel">iPhone & iPad</h1>
							<br/>
							<a className="button blue standart" href={config.links.ios} target="_blank">{t.s("install")}</a>
						</div>
					</div>
				</div></div>

				<div className="promoScreen">
					<SuperImg src="marketing/ios.png" className="animation-flying"/>
				</div>
			</section>
		);
	}
}

export default MainWrap(Main)