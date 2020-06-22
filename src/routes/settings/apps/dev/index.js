import s from './index.module.styl'
import React from 'react'
import t from '~t'
import AppsStore from '~stores/apps'

import Icon from '~icon'
import { Header, Content } from '~co/screen/splitview/main'
import Lazy from '../common/lazy'
import Clients from '../common/clients'

class Dev extends React.Component {
	state = AppsStore.getState().clients
	
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
			<>
				<Header title={t.s('dev')} />

				<Content>
					<Lazy {...this.state}>
						<Clients {...this.state} />
					</Lazy>

					<div className={s.intro}>
						Want to develop an application using the &nbsp;<a href="https://developer.raindrop.io" target="_blank"><Icon name='document' size='micro' /> Raindrop.io API</a>?
						
						<div className={s.add}>
							<a href="#/settings/apps/dev/add" className="button blue standart">
								<Icon name='add' size='micro' />&nbsp;
								Register a new application
							</a>
						</div>
					</div>
				</Content>
			</>
		)
	}
}

export default Dev