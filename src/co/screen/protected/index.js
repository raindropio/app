import s from './index.module.styl'
import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { userStatus } from '~data/selectors/user'
import { refresh } from '~data/actions/user'

import Screen from '~co/screen/basic'
import Preloader from '~co/common/preloader'

class ScreenProtected extends React.Component {
	static defaultProps = {
		redirect: false
	}

	componentDidMount() {
		this.props.refresh()

		window.addEventListener('focus', this.props.refresh)
	}

	componentWillUnmount() {
		window.removeEventListener('focus', this.props.refresh)
	}

	render() {
		const { redirect, authorized, children, location: { pathname } } = this.props

		switch (authorized) {
			case 'yes':
				return children||null

			case 'no':
				return <Redirect to={`/account/login${redirect?`?redirect=${pathname}`:''}`} />

			default:
				return (
					<Screen>
						<div className={s.loading}>
							<Preloader enlarge='1.5' />
						</div>
					</Screen>
				)
		}
	}
}

export default connect(
	state => ({
		authorized: userStatus(state).authorized
	}),
	{ refresh }
)(withRouter(ScreenProtected))