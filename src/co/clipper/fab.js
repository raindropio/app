import React from 'react'
import t from '~t'
import Icon from '~icon'

import environment from '../../helpers/environment'

export default class ClipperFab extends React.Component {
	render() {
		if (!environment.isClipper())
			return null;
		
		return (
			<div className="clipper-floating-buttons">
				<a href="https://raindrop.io" target="_blank" tabIndex="-1" className="clipper-floating-button">
					<span><Icon name="open" /></span>
				</a>
				<a href="../index.html#/settings" tabIndex="-1" className="clipper-floating-button">
					<span><Icon name="settings" /></span>
				</a>
			</div>
		);
	}
}