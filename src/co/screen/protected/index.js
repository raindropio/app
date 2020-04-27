import React from 'react'
import { Redirect } from 'react-router-dom'
import UserStore from '~stores/user'
import Loading from '../loading'
import Error from '../error'

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
			case 'loading': return <Loading />
			case 'error': return <Error />
			case 'logged': return this.props.children
			case false: return <Redirect to='/account/login' />
		}
	}
}