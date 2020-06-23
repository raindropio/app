import React from 'react'
import Icon from '~co/common/icon'
import t from '~t'
import config from '~config'

import Button from '~co/common/button'

export default ({enabled=false, pro=false})=>{
	var subhead, button;

	if ((enabled)&&(pro)) {
		subhead = <span><Icon name='check_active' />{t.s('sync')}</span>;
		button = <Button variant='outline' href={config.apiPrefix+'user/connect/gdrive/revoke'}>{t.s('disable')}</Button>;
	}else{
		subhead = t.s('pro_dropboxD');
		button = <Button variant='outline' href={config.apiPrefix+'user/connect/gdrive'}>{t.s('enable')}</Button>;

		if (!pro)
			button = <Button variant='link' href='#/settings/upgrade'>{t.s('onlyInPro')}</Button>
	}

	return (
		<div>
			<Icon name='gdrive' data-size='60' style={{color:'#34a853'}} />
			<h1 className='extraHeadLabel'>Google Drive</h1>
			<p className='subHeadLabel'>{subhead}</p>

			<br/>
			{button}
		</div>
	)
}