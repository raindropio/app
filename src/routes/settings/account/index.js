import React from 'react'
import t from '~t'
import { Helmet } from 'react-helmet'

import { Layout, Separator } from '~co/common/form'
import Profile from './profile'
import Connect from './connect'
import Usage from './usage'
import Remove from './remove'

export default (props)=>(
	<Layout type='grid'>
		<Helmet><title>{t.s('account')} {t.s('settings').toLowerCase()}</title></Helmet>

		<Profile {...props} />

		<Separator />

		<Connect {...props} />

		<Separator />

		<Usage {...props} />

		<Separator />
		
		<Remove {...props} />
	</Layout>
)