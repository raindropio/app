import React from 'react'
import { Helmet } from 'react-helmet'
import config from '~config'
import t from '~t'
import Icon from '~icon'

import MainWrap from '../co/columns/mainWrap'
import SuperImg from '../co/common/superImg'

class Main extends React.Component {
	displayName = "install/startCollecting"

	componentDidMount() {
		
	}

	render() {
		var title = t.s("createFirstCollection")

		return (
			<section id="main">
				<header className="no-border">
					<div className="headerWrap">
						<Helmet><title>{title}</title></Helmet>

						<span className="button-toggle-sidebar"><a tabIndex="-1" onClick={this.props.sidebarToggle} className="button default"><Icon name="menu" /></a></span>
						
					</div>
				</header>

				<div id="mainBody" className="translateFromTopSlightly">
					<div className="centerContentWrap desktop-behavior">
						<div className="centerContent">
							<div className="centerContentBlock">
								<SuperImg src="empty/collections.png" />
								<h2 className="headLabel">{title}</h2>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default MainWrap(Main)