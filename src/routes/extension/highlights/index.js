import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Bookmark from './bookmark'
import Empty from './empty'

export default ({ match: { path } })=>{
	return (
		<Switch>
            <Route path={`${path}/:_id`} component={Bookmark} />
            <Route component={Empty} />
        </Switch>
	)
}