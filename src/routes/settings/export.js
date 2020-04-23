import React from 'react'
import config from '~config'
import t from '~t'
import Icon from '~icon'
import Api from '~api'

import settingsHelpers from './parts/helpers'

import SuperImg from '~co/common/superImg'
import MainWrap from '~co/columns/mainWrap'

class Main extends React.Component {
	displayName = "settings/export"

	constructor(props) {
		super(props);
		this.state = {
			text:""
		}
	}

	handleExport() {
		Api.getText('export', (text)=>{
			this.setState({text:text});
		})
	}

	render() {
		var content;
		if (this.state.text)
			content = <p style={{maxWidth:"400px"}}>{this.state.text}</p>;
		else
			content = (
				<div>
					<h1 className="extraHeadLabel">{t.s("allBookmarks")}</h1>
					<br/>
					<a className="button blue standart" onClick={this.handleExport.bind(this)} target="_blank">{t.s("sendEmail")}</a>
				</div>
			);

		return (
			<section id="main">
				<header className="no-border">
					<div className="headerWrap">
						{settingsHelpers.backButton.bind(this)()}
						<h1 className="min">{t.s("exportBookmarks")}&nbsp;{t.s("elements2")}</h1>
					</div>
				</header>

				<div id="mainBody"><div className="centerContentWrap desktop-behavior">
					<div className="centerContent">
						<div className="centerContentBlock">
							{content}
						</div>
					</div>
				</div></div>

				<div className="promoScreen">
					<SuperImg src="empty/export.png" className="animation-flying" />
				</div>
			</section>
		);
	}
}

export default MainWrap(Main)