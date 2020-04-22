import React from 'react'
import t from 't'
import Icon from 'icon'
import initAuth from '../helpers/initAuth'

import LayoutWrap from '../co/columns/layoutWrap'

class AccountLayout extends React.Component {
	displayName: "account"

	componentDidMount() {
		initAuth.alreadyLoaded=false;
	}

	render() {
		return (
			<div className="accountPageWrap">
				<Icon name="diamond" className="cloudCloud" />
				<Icon name="default_collection" className="cloudCloud" />
				<Icon name="video" className="cloudCloud" />
				{this.props.children}
			</div>
		);
	}
}

export default LayoutWrap(AccountLayout, {disableTheme:true})