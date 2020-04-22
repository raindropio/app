import React from 'react'
import UserStore from '../stores/user'

export default class AppInit extends React.Component {
	displayName = 'app/init'

	componentDidMount() {
		var cId;
		try{cId = parseInt(UserStore.getUser().config.last_collection);}catch(e){}
		cId = cId || 0;
		window.location.hash = "#/collection/"+cId;
	}

	render() {
		return (
			<section id="main">
				<div id="mainBody"/>
			</section>
		);
	}
}