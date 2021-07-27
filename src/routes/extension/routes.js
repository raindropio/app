import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Clipper from './clipper'
import Welcome from './welcome'
import Tabs from './tabs'
import NotFound from './notFound'

export default ({ match: { path } })=>{
	return (
		<Switch>
			<Route path={`${path}/clipper`} component={Clipper} />
			<Route path={`${path}/welcome`} component={Welcome} />
			<Route path={`${path}/tabs/:collectionId`} component={Tabs} />
			<Route component={NotFound} />
		</Switch>
	)
}