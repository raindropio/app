import './css/base.styl'

import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Switch } from 'react-router-dom'

import Base from './base'

import Account from './account/routes'
import App from './app/routes'
import Install from './install/routes'
import Settings from './settings/routes'

render(
	<Router>
		<Base>
			<Switch>
				{Account}
				{Install.getRoutes()}
				{Settings}

				{App}
			</Switch>
		</Base>
	</Router>,
	document.getElementById('react')
)