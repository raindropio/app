import React from 'react'
import t from '~t'
import { Helmet } from 'react-helmet'

import { Layout, Separator } from '~co/common/form'
import { Header } from '~co/screen/splitview/main'
import { Title } from '~co/common/header'

import Export from './export'
import Cloud from './cloud'

export default (props)=>(
	<>
		<Helmet><title>{t.s('backups')}</title></Helmet>
		<Header data-fancy><Title>{t.s('backups')}</Title></Header>

		<Layout type='grid'>
			<Export {...props} />
			<Separator />
			<Cloud {...props} />
		</Layout>
	</>
)