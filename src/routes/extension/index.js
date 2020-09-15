import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Clipper from './clipper'
import NotFound from './notFound'

export default ({ match: { path } })=>{
	return (
		<Switch>
			<Route path={`${path}/clipper`} component={Clipper} />
			<Route component={NotFound} />
		</Switch>
	)
}