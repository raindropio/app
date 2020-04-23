import React from 'react'

export default class Start extends React.Component {
	componentDidMount() {
		window.location.hash = '#/app'
	}

	render() {
		return null;
	}
}