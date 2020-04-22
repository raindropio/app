import React from 'react'
import t from 't'
import environment from '../helpers/environment'
import routeHelpers from '../helpers/routes'
import routes from './routes'

import keyvalActions from '../actions/keyval'
import Pop from '../actions/pop'

import Icon from 'icon'
import CollectionItem from '../co/collections/item'
import SuperOverflow from '../co/common/superOverflow'
import TabBar from '../app/sidebar/tabBar'
import SidebarWrap from '../co/columns/sidebarWrap'

class Sidebar extends React.Component {
	displayName = "sidebar"
	
	sidebarToggle(e) {
		e.preventDefault();
		keyvalActions.toggle('mode-force-sidebar', true);
	}

	componentDidMount() {
		if (typeof document !== 'undefined'){
			var active = document.querySelector('#sidebar .active .superLink');
			if (active) active.focus();
		}
	}

	render() {
		return (<aside id="sidebar">
			<header>
				<div className="headerWrap">
					{this.props.toggleSidebarIcon}
					<div className="sidebarHeaderTitle">
						{t.s("install")}
					</div>
				</div>
			</header>

			<SuperOverflow id="sidebarContent">
				{routeHelpers.renderSidebar(routes.getRoutesList())}
			</SuperOverflow>

			<TabBar active="install" />
		</aside>);
	}
}

export default SidebarWrap(Sidebar)