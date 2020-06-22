import React from 'react'
import { Route, Redirect, Switch, useRouteMatch } from 'react-router-dom'
import environment from '~modules/environment'

import SplitView from '~co/screen/splitview'
import Protected from '~co/screen/protected'

import Sidebar from './sidebar'

import Upgrade from './upgrade'
import Common from './common'
import Profile from './profile'

import Import from './import'
import Export from './export'
import Duplicates from './duplicates'
import Broken from './broken'

import Integrations from './integrations'
import Apps from './apps'
import About from './about'

export default ()=>{
	let { path } = useRouteMatch()

	return (
		<Protected>
			<SplitView>
				<Sidebar />
				
				<Switch>
					<Route path={`${path}/upgrade`} component={Upgrade} />
					<Route path={`${path}/common`} component={Common} />
					<Route path={`${path}/profile`} component={Profile} />

					<Route path={`${path}/import`} component={Import} />
					<Route path={`${path}/export`} component={Export} />
					<Route path={`${path}/duplicates`} component={Duplicates} />
					<Route path={`${path}/libroken`} component={Broken} />

					<Route path={`${path}/integrations`} component={Integrations} />
					<Route path={`${path}/apps`} component={Apps} />

					<Route path={`${path}/about`} component={About} />

					<Route><Redirect to={path+'/'+(environment.isClipper()?'common':'upgrade')} /></Route>
				</Switch>
			</SplitView>
		</Protected>
	)
}