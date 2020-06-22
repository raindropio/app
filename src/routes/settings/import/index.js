import React from 'react'
import t from '~t'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import Main, { Header, Content } from '~co/screen/splitview/main'
import SuperImg from '~co/common/superImg'

import ImportStart from './start'
import ImportCollections from './collections'
import ImportBookmarks from './bookmarks'
import ImportDone from './done'
import ImportNesting from './nesting'

export default ()=>{
	let { path } = useRouteMatch()

	return (
		<Main>
			<Header title={`${t.s('importBookmarks')} ${t.s('elements2')}`} />

			<Content style={{minHeight:'70%'}}>
				<Switch>
					<Route path={`${path}/collections`} component={ImportCollections} />
					<Route path={`${path}/bookmarks`} component={ImportBookmarks} />
					<Route path={`${path}/done`} component={ImportDone} />
					<Route path={`${path}/nesting`} component={ImportNesting} />

					<Route name='start' component={ImportStart} />
				</Switch>
			</Content>

			<div className='promoScreen'>
				<SuperImg src='empty/export.png' width='455' />
			</div>
		</Main>
	)
}