import React from 'react'
import { Layout, Separator } from '~co/common/form'
import Connections from './connections'
import Ready from './ready'

export default (props)=>(
	<Layout type='grid'>
		<Connections {...props} />

		<Ready {...props} />
		<Separator />
	</Layout>
)