import React from 'react'
import t from '~t'
import { Helmet } from 'react-helmet'

import { Layout, Separator } from '~co/common/form'
import Connections from './connections'
import Ready from './ready'
import Dev from './dev'

export default (props)=>(
	<Layout type='grid'>
		<Helmet><title>{t.s('integrations')}</title></Helmet>

		<Ready {...props} />
		<Separator />

		<Connections {...props} />

		<Dev {...props} />
	</Layout>
)