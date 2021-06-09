import s from './index.module.styl'
import React from 'react'
import t from '~t'
import { Route, Switch, Redirect } from 'react-router-dom'
import Screen from '~co/screen/basic'
import { target } from '~target'
import config from '~config'
import Logo from '~assets/brand/icon_raw.svg?component'

import Auth from './auth'
import JWT from './jwt'
import Login from './login'
import Signup from './signup'
import Lost from './lost'
import Recover from './recover'

export default ({ match })=>(
	<Screen className={s.page} appSize='large' safariExtensionBackdrop>
		<div className={s.content}>
			<a href='https://raindrop.io' target='_blank'>
				<Logo className={s.logo} />
			</a>

			{/* Check auth status and make redirects */}
			<Auth />

			<Switch>
				<Route path={`${match.path}/jwt`} component={JWT} />

				{/* Override all routes for specific targets */}
				{target == 'electron' && <Route component={require('./electron').default} />}
				{target == 'extension' && <Route component={require('./extension').default} />}
				{/* ------ */}

				<Route path={`${match.path}/login`} component={Login} />
				<Route path={`${match.path}/signup`} component={Signup} />
				<Route path={`${match.path}/lost`} component={Lost} />
				<Route path={`${match.path}/recover/:token`} component={Recover} />
				
				{/* Default route */}
				<Route><Redirect to={`${match.path}/login`} /></Route>
			</Switch>
		</div>

		<footer className={s.footer}>
			&copy; 2013-{new Date().getFullYear()} Raindrop.io
			<a href={config.links.help.index} target='_blank'>{t.s('support')}</a>
		</footer>
	</Screen>
)