if (!__DEV__){
	if (window.location.protocol.indexOf('http')==0){
		var { install } = require('offline-plugin/runtime');
		install();
	}
}
else{
	var Perf = require('react-addons-perf')
	window.Perf = Perf
}

require('./css/base.styl')

import React from 'react'
import { render } from 'react-dom'
import { renderToString } from 'react-dom/server'
import environment from './helpers/environment'
import strings from './modules/strings'

import { Router, Route, hashHistory, IndexRedirect, Redirect } from 'react-router'

//import template from './index.ejs'

//Routes
import Base from './base'
import Start from './start'

import Account from './account/routes'
import App from './app/routes'
import Install from './install/routes'
import Settings from './settings/routes'

const rootRoute = (
	<Route path="/" component={Base}>
		<IndexRedirect to="/start" />
		<Redirect path="/_=_" to="/" />{/*facebook success redirect fix*/}
		<Route path="/start" name="start" component={Start} />

		{Account}
		{App}
		{Install.getRoutes()}
		{Settings}
	</Route>
);

//Client side

var isRendered = false;

function tryToRender(e) {
	var elem = document.getElementById('react');

	if ((elem)&&(!isRendered)){
		isRendered = true;

		render((
			<Router history={hashHistory}>
				{rootRoute}
			</Router>
		), elem);
	}
}

tryToRender();
window.addEventListener('load', tryToRender);
document.addEventListener("DOMContentLoaded", tryToRender);