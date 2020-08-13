import React from 'react'
import { Layout, Separator } from '~co/common/form'
import Connections from './connections'
import Ready from './ready'
import Dev from './dev'

export default (props)=>(
	<Layout type='grid'>
		<Ready {...props} />
		<Separator />

		<Connections {...props} />

		<Dev {...props} />
	</Layout>
)