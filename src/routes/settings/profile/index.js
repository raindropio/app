import React from 'react'
import { Layout, Separator } from '~co/common/form'

import Personal from './personal'
import Connect from './connect'
import Password from './password'
import Remove from './remove'

export default (props)=>(
	<Layout type='grid'>
		<Personal {...props} />
		<Connect {...props} />

		<Separator />
		
		<Password {...props} />

		<Separator />
		
		<Remove {...props} />
	</Layout>
)