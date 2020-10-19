import React from 'react'
import { connect } from 'react-redux'
import { subscription } from '~data/selectors/user'
import { loadSubscription } from '~data/actions/user'

import { Layout, Separator } from '~co/common/form'
import Alert from './alert'
import Status from './status'
import Period from './period'
import Price from './price'
import Actions from './actions'
import Help from './help'

class SettingsProPaid extends React.Component {
	componentDidMount() {
		this.props.loadSubscription()

		window.addEventListener('focus', this.props.loadSubscription)
	}

	componentWillUnmount() {
		window.removeEventListener('focus', this.props.loadSubscription)
	}

	render() {
		return (
			<Layout type='grid'>
				<Alert {...this.props} />
				
				<Status {...this.props} />
				<Price {...this.props} />
				<Period {...this.props} />
				
				<Separator />

				<Actions {...this.props} />

				<Separator />

				<Help {...this.props} />
			</Layout>
		)
	}
}

export default connect(
    state=>({
        subscription: subscription(state)
	}),
	{ loadSubscription }
)(SettingsProPaid)