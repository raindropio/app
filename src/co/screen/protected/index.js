import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isNotAuthorized } from '~data/selectors/user'
import { refresh } from '~data/actions/user'

class ScreenProtected extends React.Component {
	static defaultProps = {
		redirect: false
	}

	componentDidMount() {
		this.props.refresh()
	}

	render() {
		const { redirect, notLogged, children, location: { pathname } } = this.props

		if(notLogged)
			return <Redirect to={`/account/login${redirect?`?redirect=${pathname}`:''}`} />

		return children
	}
}

export default connect(
	state => ({
		notLogged: isNotAuthorized(state)
	}),
	{ refresh }
)(withRouter(ScreenProtected))