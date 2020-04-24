import React from 'react'
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'
import Icon from '~icon'

import Screen from '~co/screen/basic'
import Login from './login'
import Signup from './signup'
import Reset from './reset'
import Recover from './recover'

export default ()=>{
	let { path } = useRouteMatch()

	return (
		<Screen>
			<div className='accountPageWrap'>
				<Icon name='diamond' className='cloudCloud' />
				<Icon name='default_collection' className='cloudCloud' />
				<Icon name='video' className='cloudCloud' />
				
				<Switch>
					<Route path={`${path}/login`} component={Login} />
					<Route path={`${path}/signup`} component={Signup} />
					<Route path={`${path}/reset`} component={Reset} />
					<Route path={`${path}/recover/:token`} component={Recover} />
	
					<Route><Redirect to={`${path}/login`} /></Route>
				</Switch>
			</div>
		</Screen>
	)
}