import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { isNotAuthorized } from '~data/selectors/user'
import * as userActions from '~data/actions/user'

class ScreenProtected extends React.Component {
	componentDidMount() {
		this.props.refresh()
	}

	render() {
		if(this.props.notLogged)
			return <Redirect to='/account/login' />

		return this.props.children
	}
}

export default connect(
	state => ({
		notLogged: isNotAuthorized(state)
	}),
	userActions
)(ScreenProtected)