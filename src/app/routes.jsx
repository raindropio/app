import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import Index from './index'
import LastCollection from './lastCollection'
import Collection from './collection'
import Duplicates from './duplicates'
import Tags from './tags'
import Broken from './broken'
import StartCollecting from './startCollecting'

export default (
	<Route path="/app" name="app" component={Index}>
		<IndexRedirect to="/app/loading" />
		<Route path="/app/loading" component={LastCollection} />

		<Route path="/collection/:cid(/:search)" name="collection" component={Collection} />
		<Route path="/app/duplicates" name="duplicates" component={Duplicates} />
		<Route path="/app/tags" name="tags" component={Tags} />
		<Route path="/app/libroken" name="libroken" component={Broken} />
		<Route path="/app/startcollecting" name="startcollecting" component={StartCollecting} />
	</Route>
);