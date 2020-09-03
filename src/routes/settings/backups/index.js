import React from 'react'
import t from '~t'
import { Helmet } from 'react-helmet'

import { Layout, Separator } from '~co/common/form'
import Export from './export'
import Cloud from './cloud'

export default (props)=>(
	<Layout type='grid'>
		<Helmet><title>{t.s('backups')}</title></Helmet>

		<Export {...props} />
		<Separator />
		<Cloud {...props} />
	</Layout>
)