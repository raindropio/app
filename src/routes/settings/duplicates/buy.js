import React from 'react'
import t from '~t'
import SuperImg from '~co/common/superImg'
import Main, { Header, Content } from '~co/screen/splitview/main'

export default () => {
	return (
		<Main>
			<Header title={t.s('duplicates')} />

			<Content>
				<div className='centerContentWrap desktop-behavior'>
					<div className='centerContent'>
						<div className='centerContentBlock'>
							<SuperImg src='empty/duplicate.png' />
							<h2 className='headLabel'>{t.s('duplicates') + ' ' + t.s('onlyInPro')}</h2>
							<br/>
							<a className='button blue standart' href='#/settings/upgrade'>{t.s('goToPRO')}</a>
						</div>
					</div>
				</div>
			</Content>
		</Main>
	);
}