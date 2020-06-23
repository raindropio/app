import s from './index.module.styl'
import React from 'react'
import t from '~t'
import AppsStore from '~stores/apps'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
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
						Want to develop an application using the &nbsp;<a href='https://developer.raindrop.io' target='_blank'><Icon name='document' data-size='micro' /> Raindrop.io API</a>?
						
						<div className={s.add}>
							<Button href='#/settings/apps/dev/add' variant='primary'>
								<Icon name='add' data-size='micro' />&nbsp;
								Register a new application
							</Button>
						</div>
					</div>
				</Content>
			</>
		)
	}
}

export default Dev