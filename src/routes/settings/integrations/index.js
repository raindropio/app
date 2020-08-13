import React from 'react'
import { Layout, Separator } from '~co/common/form'
import IFTTT from './ifttt'
import Zapier from './zapier'
import Connections from './connections'

export default (props)=>(
	<Layout type='grid'>
		<Connections {...props} />

		<IFTTT {...props} />
		<Separator />

		<Zapier {...props} />
		<Separator />
	</Layout>
)