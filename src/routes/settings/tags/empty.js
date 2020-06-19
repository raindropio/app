import React from 'react'
import t from '~t'

import Main, { Header, Content } from '~co/screen/splitview/main'
import SuperImg from '~co/common/superImg'

export default () => (
	<Main>
		<Header title={`${t.s('tags')} ${t.s('maintenance').toLowerCase()}`} />

		<Content>
			<div className='centerContentWrap'>
				<div className='centerContent'>
					<div className='centerContentBlock'>
						<SuperImg src='empty/tags.png' />
						<h2 className='headLabel'>{t.s('noTags')}</h2>
					</div>
				</div>
			</div>
		</Content>
	</Main>
)