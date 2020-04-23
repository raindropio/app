import React from 'react'
import t from '~t'
import settingsHelpers from '../parts/helpers'
import AppsStore from '~stores/apps'

import MainWrap from '~co/columns/mainWrap'
import Lazy from './common/lazy'
import Clients from './common/clients'

class About extends React.Component {
	displayName = "settings/apps/authorized"

	constructor(props) {
        super(props)

        this.state = AppsStore.getState().connections
	}
	
	componentDidMount() {
        this._uns = AppsStore.listen(this.onAppsChange.bind(this));

        AppsStore.onLoadConnections()
    }

    componentWillUnmount() {
        this._uns && this._uns()
    }

	onAppsChange = (state) =>
		this.setState(state.connections)

	render() {
		return (
			<section id="main">
				<header className="no-border">
					<div className="headerWrap">
						{settingsHelpers.backButton.bind(this)()}
                        <h1 className="min">{t.s("connected")} {t.s('interest_technology_applications').toLowerCase()}</h1>
					</div>
				</header>

				<div id="mainBody">
					<Lazy {...this.state}>
						<Clients {...this.state} />
					</Lazy>
                </div>
			</section>
		);
	}
}

export default MainWrap(About)