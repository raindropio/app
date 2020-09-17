import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Clipper from './clipper'
import Welcome from './welcome'
import NotFound from './notFound'

export default ({ match: { path } })=>{
	return (
		<Switch>
			<Route path={`${path}/clipper`} component={Clipper} />
			<Route path={`${path}/welcome`} component={Welcome} />
			<Route component={NotFound} />
		</Switch>
	)
}