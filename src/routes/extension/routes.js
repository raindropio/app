import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Clipper from './clipper'
import Welcome from './welcome'
import Tabs from './tabs'
import Highlights from './highlights'
import NotFound from './notFound'

export default ({ match: { path } })=>{
	return (
		<Switch>
			<Route path={`${path}/clipper`} component={Clipper} />
			<Route path={`${path}/welcome`} component={Welcome} />
			<Route path={`${path}/tabs/:collectionId`} component={Tabs} />
			<Route path={`${path}/highlights/:_id`} component={Highlights} />
			<Route component={NotFound} />
		</Switch>
	)
}