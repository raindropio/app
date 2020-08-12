import React from 'react'
import t from '~t'
import _ from 'lodash'
import { Layout, Title, Separator } from '~co/common/form'

import Personal from './personal'
import Password from './password'
import Connect from './connect'

export default (props)=>(
	<Layout type='grid'>
		<Title>{_.capitalize(t.s('account'))}</Title>
		<Personal />
		<Connect />

		<Separator />
		
		<Title>{t.s('changePassword')}</Title>
		<Password />
	</Layout>
)