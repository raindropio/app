import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import environment from '~modules/environment'

import Index from './index'
import Upgrade from './upgrade'
import Common from './common'
import Profile from './profile'
import Export from './export'
import Vote from './vote'
import About from './about'
import Integrations from './integrations'

import Import from './import'
import ImportStart from './import/start'
import ImportCollections from './import/collections'
import ImportBookmarks from './import/bookmarks'
import ImportDone from './import/done'
import ImportNesting from './import/nesting'

import AppsAuthorized from './apps/authorized'
import AppsDev from './apps/dev'
import AppsDevEdit from './apps/dev/edit'
import AppsDevAdd from './apps/dev/add'

export default (
	<Route path='/settings' name='settings'>
		<Index>
			<Switch>
				<Route path='/settings/upgrade' name='upgrade' component={Upgrade} />
				<Route path='/settings/common' name='common' component={Common} />
				<Route path='/settings/profile' name='profile' component={Profile} />

				<Route path='/settings/import' name='import'>
					<Import>
						<Switch>
							<Route path='/settings/import/collections' name='collections' component={ImportCollections} />
							<Route path='/settings/import/bookmarks' name='bookmarks' component={ImportBookmarks} />
							<Route path='/settings/import/done' name='done' component={ImportDone} />
							<Route path='/settings/import/nesting' name='nesting' component={ImportNesting} />

							<Route name='start' component={ImportStart} />
						</Switch>
					</Import>
				</Route>

				<Route path='/settings/export' name='export' component={Export} />

				<Route path='/settings/vote' name='vote' component={Vote} />
				<Route path='/settings/about' name='about' component={About} />
				<Route path='/settings/integrations' name='integrations' component={Integrations} />

				<Route path='/settings/apps/authorized' name='apps/authorized' component={AppsAuthorized} />
				<Route path='/settings/apps/dev/edit/:id' name='apps/dev/edit' component={AppsDevEdit} />
				<Route path='/settings/apps/dev/add' name='apps/dev/add' component={AppsDevAdd} />
				<Route path='/settings/apps/dev' name='apps/dev' component={AppsDev} />

				<Route><Redirect to={'/settings/'+(environment.isClipper()?'common':'upgrade')} /></Route>
			</Switch>
		</Index>
	</Route>
)