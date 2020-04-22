import React from 'react'
import Icon from 'icon'
import t from 't'

module.exports = {
	backButton(small) {
		var label = <span>{t.s("all") + " " + t.s('settings').toLowerCase()}</span>;
		if (small) label = null;
		return <span className="button-toggle-sidebar button-toggle-sidebar-autowidth"><a tabIndex="-1" onClick={this.props.sidebarToggle} className="button default"><Icon name="back"/>{label}</a></span>;
	}
}