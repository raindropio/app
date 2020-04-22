import React from 'react'
import t from '~t'
import Icon from '~icon'
import network from '~network'

import Pop from '../../actions/pop'
import Preloader from '../common/preloader'

export default class Loading extends React.Component {
	render() {
		var text;
		if (this.props.title)
			text = [
				<p key="title" className="subHeadLabel">{this.props.title}...</p>
			];

		return (<form className="superForm">
			<div className="loading-block centerContentWrap desktop-behavior">
				<div className="centerContent">
					<Preloader />
					{text}
				</div>
			</div>
		</form>);
	}
}