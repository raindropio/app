import React from 'react'
import t from '~t'
import { Helmet } from 'react-helmet'

import { Layout, Separator, Buttons } from '~co/common/form'
import Profile from './profile'
import Connect from './connect'
import Usage from './usage'
import LogoutAll from './logoutAll'
import Reset from './reset'
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

		<div />
		<div>
			<LogoutAll {...props} />
			<Reset {...props} />
			<Remove {...props} />
		</div>
	</Layout>
)