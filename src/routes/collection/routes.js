import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Index from './index'
import Collection from './collection'

export default (
	<Route path='/collection'>
		<Index>
			<Switch>
				<Route path='/collection/:cid(-?\d+)/:search?' name='collection' component={Collection} />
			</Switch>
		</Index>
	</Route>
)