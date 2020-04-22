import React from 'react'
import Icon from 'icon'
import t from 't'
import config from 'config'

import settingsHelpers from './parts/helpers'

import MainWrap from '../co/columns/mainWrap'
import SuperFrame from '../co/common/superFrame'

class Main extends React.Component {
	displayName: "settings/vote"

	render() {
		return (
			<section id="main">
				<header>
					<div className="headerWrap">
						{settingsHelpers.backButton.bind(this)()}
						<h1 className="min">{t.s("pro_nextFeatures")}</h1>
					</div>
				</header>

				<div id="mainBody">
					<SuperFrame disableProxy={true} src="https://productpains.com/widget.html?token=eef2ded6-85b0-ceee-230b-49a89fd4b95b" domain="productpains.com" />
				</div>
			</section>
		);
	}
}

export default MainWrap(Main)