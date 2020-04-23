import React from 'react'
import Icon from '~icon'
import t from '~t'
import config from '~config'
import environment from '~modules/environment'

export default ({enabled=false, pro=false})=>{
	var subhead, button;

	if ((enabled)&&(pro)) {
		subhead = <span><Icon name="check_active" />{t.s("sync")}</span>;
		button = <a className="button default" href={config.apiPrefix+"user/connect/dropbox/revoke"}><b>{t.s("disable")}</b></a>;
	}else{
		subhead = t.s("pro_dropboxD");
		button = <a className="button blue standart" href={config.apiPrefix+"user/connect/dropbox"}><b>{t.s("enable")}</b></a>;

		if (!pro)
			button = <a className="button active min" href="#/settings/upgrade">{t.s("onlyInPro")}</a>
	}

	return (
		<div>
			<Icon name="dropbox" className="svgIcon-size-60" style={{color:"#007ee5"}} />
			<h1 className="extraHeadLabel">Dropbox</h1>
			<p className="subHeadLabel">{subhead}</p>

			<br/>
			{button}
		</div>
	)
}