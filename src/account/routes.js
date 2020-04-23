import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Index from './index'
import RedirectRoute from './redirect'
import Login from './login'
import Signup from './signup'
import Reset from './reset'
import Recover from './recover'

import Welcome from './welcome'

export default (
	<Route path='/account' name='account'>
		<Index>
			<Switch>
				<Route path='/account/redirect' name='redirect' component={RedirectRoute} />
				<Route path='/account/login' name='login' component={Login} />
				<Route path='/account/signup' name='signup' component={Signup} />
				<Route path='/account/reset' name='reset' component={Reset} />
				<Route path='/account/recover/:token' name='recover' component={Recover} />

				<Route name='welcome' component={Welcome} />
			</Switch>
		</Index>
	</Route>
)