import React from 'react'
import t from '~t'

import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default class ImportNesting extends React.Component {
	displayName = 'settings/import/nesting'

	render() {
		return (
			<div className='centerContentWrap'>
				<div className='centerContent'>
					<div className='centerContentBlock'>
						<Icon name='24_home_active' enlarge='3' className='color-theme' />
						<h1 className='extraHeadLabel'>{t.format('youHave')+' '+t.s('pro_nesting').toLowerCase()}</h1>
						<h2 className='mediumHeadLabel' style={{maxWidth:'500px'}}>
							{t.s('importBookmarks')+' '}
							{t.s('pro_nesting').toLowerCase()+' '}
							<a href='#/settings/upgrade'>{t.s('onlyInPro')}</a>
						</h2>
						<br />
						<p className='subHeadLabel' style={{maxWidth:'500px'}}>
							{t.s('importWithoutNestedCollections')}
						</p><br />

						<Button href='#/settings/import/collections' variant='primary'>{t.s('continue')}</Button>
					</div>
				</div>
			</div>
		);
	}
}