import React from 'react'
import t from '~t'
import settingsHelpers from '../../parts/helpers'
import AppsStore from '~stores/apps'

import Icon from '~icon'
import MainWrap from '~co/columns/mainWrap'
import Lazy from '../common/lazy'
import Clients from '../common/clients'

class About extends React.Component {
	displayName = "settings/apps/dev"

	constructor(props) {
        super(props)

        this.state = AppsStore.getState().clients
	}
	
	componentDidMount() {
        this._uns = AppsStore.listen(this.onAppsChange.bind(this));

        AppsStore.onLoadClients()
    }

    componentWillUnmount() {
        this._uns && this._uns()
    }

	onAppsChange = (state) =>
		this.setState(state.clients)

	render() {
		return (
			<section id="main">
				<header className="no-border">
					<div className="headerWrap">
						{settingsHelpers.backButton.bind(this)()}
                        <h1 className="min">{t.s("dev")}</h1>
					</div>
				</header>

				<div id="mainBody">
					<Lazy {...this.state}>
						<Clients {...this.state} />
					</Lazy>

					<div className="clients-dev-intro">
						Want to develop an application using the &nbsp;<a href="https://developer.raindrop.io" target="_blank"><Icon name='document' size='micro' /> Raindrop.io API</a>?
						
						<div className="dev-add">
							<a href="#/settings/apps/dev/add" className="button blue standart">
								<Icon name='add' size='micro' />&nbsp;
								Register a new application
							</a>
						</div>
					</div>
                </div>
			</section>
		);
	}
}

export default MainWrap(About)