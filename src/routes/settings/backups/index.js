import React from 'react'
import { Layout, Separator } from '~co/common/form'
import Export from './export'
import Cloud from './cloud'

export default (props)=>(
	<Layout type='grid'>
		<Export {...props} />
		<Separator />
		<Cloud {...props} />
	</Layout>
)