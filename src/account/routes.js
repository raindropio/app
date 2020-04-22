import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import Index from './index'
import Redirect from './redirect'
import Login from './login'
import Signup from './signup'
import Reset from './reset'
import Recover from './recover'

import Welcome from './welcome'

export default (
	<Route path="/account" name="account" component={Index}>
		<IndexRedirect to="/account/welcome" />
		<Route path="/account/redirect" name="redirect" component={Redirect} />
		<Route path="/account/login" name="login" component={Login} />
		<Route path="/account/signup" name="signup" component={Signup} />
		<Route path="/account/reset" name="reset" component={Reset} />
		<Route path="/account/recover/:token" name="recover" component={Recover} />

		<Route path="/account/welcome" name="welcome" component={Welcome} />
	</Route>
)