import React from 'react'
import t from '~t'
import { Helmet } from 'react-helmet'
import { target } from '~target'
import config from '~config'
import { Layout } from '~co/common/form'
import Alert from '~co/common/alert'
import { Header } from '~co/screen/splitview/main'
import { Title, Space } from '~co/common/header'

import File from './file'
import Mode from './mode'
import Parcel from './parcel'
import Help from './help'

export default function Import({ location: { pathname } }) {
	if (target == 'extension')
		return (
			<>
				<Header data-fancy><Title>{t.s('import')}</Title></Header>
				
				<Layout>
					<Alert variant='warning'>
						<a href={`${config.links.app.index}${pathname}`} target='_blank'>{t.s('open')} {t.s('inNewTab')}</a> {t.s('forUploads')}!
					</Alert>
				</Layout>
			</>
		)

	return (
		<>
			<Header data-fancy>
				<Title>{t.s('import')}</Title>
				<Space />
				<Help />
			</Header>

			<Layout type='grid'>
				<Helmet><title>{t.s('import')}</title></Helmet>
		
				<File />
				<Mode />
				<Parcel />
			</Layout>
		</>
	)
}