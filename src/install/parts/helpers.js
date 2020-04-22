import React from 'react'
import Icon from 'icon'
import t from 't'

module.exports = {
	backButton(small) {
		var label = <span>{t.s("install")}</span>;
		if (small) label = null;
		var onClick;
		try{onClick = this.props.sidebarToggle}catch(e){}
		return <span className="button-toggle-sidebar button-toggle-sidebar-autowidth"><a tabIndex="-1" onClick={onClick} className="button default"><Icon name="back"/>{label}</a></span>;
	}
}