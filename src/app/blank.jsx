import React from 'react'
import config from 'config'
import t from 't'
import Icon from 'icon'

import MainWrap from '../co/columns/mainWrap'
import keyvalActions from '../actions/keyval'
import keyvalStore from '../stores/keyval'

class Main extends React.Component {
	displayName: "install/blank"

	onKeyvalChange(all) {
		var isForceSidebar = keyvalStore.onGet('mode-force-sidebar')||false;
		if (!isForceSidebar)
			keyvalActions.set('mode-force-sidebar', true, true)
	}

	componentDidMount() {
		setTimeout(()=>keyvalActions.set('mode-force-sidebar', true, true),100)
		this.unsubscribeKeyval = keyvalStore.listen(this.onKeyvalChange.bind(this));
    }

    componentWillUnmount() {
        if (this.unsubscribeKeyval) this.unsubscribeKeyval();
    }

	render() {
		return (
			<section id="main">
				<header className="no-border">
					<div className="headerWrap">
						<span className="button-toggle-sidebar"><a tabIndex="-1" onClick={this.props.sidebarToggle} className="button default"><Icon name="menu" /></a></span>
						
					</div>
				</header>

				<div id="mainBody"></div>
			</section>
		);
	}
}

export default MainWrap(Main)