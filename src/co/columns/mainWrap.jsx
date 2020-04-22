import React from 'react'
import environment from '../../helpers/environment'

import keyvalActions from '../../actions/keyval'
import keyvalStore from '../../stores/keyval'

export default function(Component) {
	return class MainWrap extends React.Component {
		displayName = "columns/mainWrap"

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
	        this.unsubscribeKeyval = keyvalStore.listen(this.onKeyvalChange.bind(this));

	        this.sidebarSmartClose();
	    }

	    componentWillUnmount() {
	        if (this.unsubscribeKeyval) this.unsubscribeKeyval();
	    }

	    sidebarSmartClose() {
	    	if (typeof document !== 'undefined')
		    	if (document.getElementById('js_markup_status').offsetWidth<=2) {
		    		keyvalActions.remove('mode-panel', true);
					keyvalActions.remove('mode-force-sidebar', true);
		    	}
		}

	    sidebarToggle(e) {
			if (e) if (typeof e.preventDefault == "function") e.preventDefault();
			keyvalActions.toggle('mode-force-sidebar', true);
		}

		render() {
			return <Component
						key="pageMain"
						{...this.props}
						{...this.state}
						sidebarToggle={this.sidebarToggle}
						sidebarSmartClose={this.sidebarSmartClose} />;
		}
	}
}