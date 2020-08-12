import React from 'react'
import t from '~t'
import AppsStore from '~stores/apps'

import Main, { Header, Content } from '~co/screen/splitview/main'
import Lazy from './common/lazy'
import Clients from './common/clients'

class Authorized extends React.Component {
	state = AppsStore.getState().connections
	
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
			<>
				<Header title={`${t.s('connected')} ${t.s('interest_technology_applications').toLowerCase()}`} />

				<Content>
					<Lazy {...this.state}>
						<Clients {...this.state} />
					</Lazy>
				</Content>
			</>
		);
	}
}

export default Authorized