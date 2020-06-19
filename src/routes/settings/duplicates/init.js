import React from 'react'
import t from '~t'
import Preloader from '~co/common/preloader'
import Main, { Header, Content } from '~co/screen/splitview/main'

export default () => {
	return (
		<Main>
			<Header title={t.s('duplicates')} />

			<Content>
				<div className='centerContentWrap'>
					<div className='centerContent'>
						<div className='centerContentBlock'>
							<Preloader />
						</div>
					</div>
				</div>
			</Content>
		</Main>
	)
}