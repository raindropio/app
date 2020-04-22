import React from 'react'
import environment from './helpers/environment'
import keyValStore from './stores/keyval'

export default class Start extends React.Component {
	displayName = "start"

	openApp() {
		window.location.hash = "#/app";
	}

	componentWillMount() {
		this.openApp();
	}

	render() {
		return null;
	}
}