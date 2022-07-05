import React from 'react'
import t from '~t'
import { Helmet } from 'react-helmet'

import { Layout } from '~co/common/form'
import { Header } from '~co/screen/splitview/main'
import { Title } from '~co/common/header'

import Connections from './connections'
import Ready from './ready'
import Dev from './dev'

export default (props)=>(
	<>
		<Helmet><title>{t.s('integrations')}</title></Helmet>
		<Header data-fancy><Title>{t.s('integrations')}</Title></Header>
		
		<Layout type='grid'>
			<Ready {...props} />

			<Connections {...props} />

			<Dev {...props} />
		</Layout>
	</>
)