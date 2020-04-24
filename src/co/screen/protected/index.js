import React from 'react'
import { Redirect } from 'react-router-dom'
import UserStore from '~stores/user'

export default class ScreenProtected extends React.Component {
	state = {
		status: 'loading'
	}

	componentDidMount() {
		UserStore.onLoad((status)=>
			this.setState({ status })
		)
	}

	render() {
		switch(this.state.status) {
			case 'loading': return null
			case 'error': return <b>Error</b>
			case 'logged': return this.props.children
			case false: return <Redirect to='/account/login' />
		}
	}
}