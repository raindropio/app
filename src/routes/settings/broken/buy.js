import React from 'react'
import t from '~t'

import SuperImg from '~co/common/superImg'
import Button from '~co/common/button'

export default () => {
	return (
		<div className='centerContentWrap'>
			<div className='centerContent'>
				<div className='centerContentBlock'>
					<SuperImg src='empty/broken.png' />
					<h2 className='headLabel'>{t.s('broken') + ' ' + t.s('links').toLowerCase() + ' ' + t.s('onlyInPro')}</h2>
					<br/>
					<Button variant='primary' href='#/settings/upgrade'>{t.s('goToPRO')}</Button>
				</div>
			</div>
		</div>
	);
}