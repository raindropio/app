import React from 'react'
import t from '~t'
import { Helmet } from 'react-helmet'

import { Layout, Separator } from '~co/common/form'
import { Header } from '~co/screen/splitview/main'
import { Title } from '~co/common/header'
import { Wrap } from '~co/common/list'

import Profile from './profile'
import Connect from './connect'
import Usage from './usage'
import LogoutAll from './logoutAll'
import Reset from './reset'
import Remove from './remove'

export default (props)=>(
	<>
		<Helmet><title>{t.s('account')} {t.s('settings').toLowerCase()}</title></Helmet>
		<Header data-fancy><Title>{t.s('account')}</Title></Header>

		<Layout type='grid'>
			<Profile {...props} />

			<Separator />

			<Connect {...props} />

			<Separator />

			<Usage {...props} />

			<Separator />

			<div />
			<Wrap>
				<LogoutAll {...props} />
			</Wrap>

			<div />
			<Wrap>
				<Reset {...props} />
				<Remove {...props} />
			</Wrap>
		</Layout>
	</>
)