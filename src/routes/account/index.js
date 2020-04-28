import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Login from './login'
import Signup from './signup'
import Lost from './lost'
import Recover from './recover'

export default ({ match })=>(
	<Switch>
		<Route path={`${match.path}/login`} component={Login} />
		<Route path={`${match.path}/signup`} component={Signup} />
		<Route path={`${match.path}/lost`} component={Lost} />
		<Route path={`${match.path}/recover/:token`} component={Recover} />

		{/* Default route */}
		<Route><Redirect to={`${match.path}/login`} /></Route>
	</Switch>
)