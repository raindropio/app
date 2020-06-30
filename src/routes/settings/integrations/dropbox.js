import React from 'react'
import Icon from '~co/common/icon'
import t from '~t'
import config from '~config'
import environment from '~modules/environment'

import Button from '~co/common/button'

export default ({enabled=false, pro=false})=>{
	var subhead, button;

	if ((enabled)&&(pro)) {
		subhead = <span><Icon name="check_active" />{t.s("sync")}</span>;
		button = <Button variant='outline' href={config.apiPrefix+"user/connect/dropbox/revoke"}>{t.s("disable")}</Button>;
	}else{
		subhead = t.s("pro_dropboxD");
		button = <Button variant='outline' href={config.apiPrefix+"user/connect/dropbox"}>{t.s("enable")}</Button>;

		if (!pro)
			button = <Button variant='link' href="#/settings/upgrade">{t.s("onlyInPro")}</Button>
	}

	return (
		<div>
			<Icon name="dropbox" enlarge="3" style={{color:"#007ee5"}} />
			<h1 className="extraHeadLabel">Dropbox</h1>
			<p className="subHeadLabel">{subhead}</p>

			<br/>
			{button}
		</div>
	)
}