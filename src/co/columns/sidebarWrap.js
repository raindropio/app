import React from 'react'
import Icon from '~icon'
import { withRouter } from 'react-router-dom'

import keyvalActions from '~actions/keyval'
import keyvalStore from '~stores/keyval'

export default function(Component) {
	return withRouter(class SidebarWrap extends React.Component {
		displayName = "columns/SidebarWrap"

		constructor(props) {
			super(props);
			this.state = {
				sidebarIsOpen: keyvalStore.onGet("mode-force-sidebar")||false,
			}
		}

		onKeyvalChange(all) {
			var isForceSidebar = keyvalStore.onGet('mode-force-sidebar')||false;
			if (this.state.sidebar != isForceSidebar)
				this.setState({sidebarIsOpen: isForceSidebar});
		}

		componentDidMount() {
			//first init
			if (!keyvalStore.onGet("sidebar-is-initialized")){
				keyvalStore.onSet('mode-force-sidebar', true, true);
				keyvalStore.onSet('sidebar-is-initialized', true, true);
			}

	        this.unsubscribeKeyval = keyvalStore.listen(this.onKeyvalChange.bind(this));
	    }

	    componentWillUnmount() {
	        if (this.unsubscribeKeyval) this.unsubscribeKeyval();
	    }

	    sidebarToggle(e) {
			if (e) if (typeof e.preventDefault == "function") e.preventDefault();
			if (!keyvalStore.onGet("mode-panel")) keyvalActions.toggle('mode-force-sidebar', true);
			keyvalActions.remove('mode-panel');
		}

		resizeClipperChromeSidebar() {
			keyvalStore.onRemove('mode-force-sidebar', true);
		}

		renderToggle() {
			return <a href="" className="button active show-on-extension" style={{marginLeft:"-12px",marginRight:"-2px"}} onClick={this.sidebarToggle}><Icon name="menu" /></a>;
		}

		render() {
			return (
				<div key="pageSidebar">
					<Component
						{...this.props}
						{...this.state}
						toggleSidebarIcon={this.renderToggle()}
						sidebarToggle={this.sidebarToggle}/>

					<div id="sidebar-black-overlay" onClick={this.sidebarToggle}></div>
				</div>
			);
		}
	})
}