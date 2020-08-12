import React from 'react'
import { Layout, Separator } from '~co/common/form'

import Personal from './personal'
import Connect from './connect'
import Password from './password'
import Remove from './remove'

export default (props)=>(
	<Layout type='grid'>
		<Personal />
		<Connect />

		<Separator />
		
		<Password />

		<Separator />
		<Remove />
	</Layout>
)