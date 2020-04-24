import React from 'react'
import t from '~t'

import Main, { Header, Content } from '~co/screen/splitview/main'
import Preloader from '~co/common/preloader'

export default () => (
	<Main>
		<Header title={`${t.s('tags')} ${t.s('maintenance').toLowerCase()}`} />

		<Content>
			<div className='centerContentWrap desktop-behavior'>
				<div className='centerContent'>
					<div className='centerContentBlock'>
						<Preloader />
					</div>
				</div>
			</div>
		</Content>
	</Main>
)