import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import environment from '../helpers/environment'
import routeHelpers from '../helpers/routes'
import t from '~t'

import Index from './index'
import Blank from '../install/blank'
import Extension from './extension'
import IOS from './ios'
import Android from './android'
import Mac from './mac'
import Windows from './windows'

export default {
	getRoutes() {
		let items = routeHelpers.listToRoutes(this.getRoutesList());//{items}
		
		return (
			<Route path='/install' name='install'>
				<Index>
					<Switch>
						<Route path='/install/blank' name='blank' component={Blank} />
						{items}

						<Route><Redirect to={'/install/'+(environment.isClipper()?'blank':'extension')} /></Route>
					</Switch>
				</Index>
			</Route>
		)
	},

	getRoutesList() {
		let list = [
			{
				group: t.s('mobileApp'),
				items: [
					{
						name: 'ios',
						path: '/install/ios',
						title: 'iPhone & iPad',
						icon: 'apple',
						component: IOS
					}
				]
			}
		]

		if (!environment.isClipperSafari()){
			list.unshift({
				group: t.s('pro_desktop'),
				items: [
					{//also forbiden by AppStore
						name: 'mac',
						path: '/install/mac',
						title: 'macOS',
						icon: 'apple',
						component: Mac
					},
					{
						name: 'windows',
						path: '/install/windows',
						title: 'Windows',
						icon: 'microsoft',
						component: Windows
					}
				]
			})

			list[1].items.push({
				name: 'android',
				path: '/install/android',
				title: 'Android',
				component: Android
			})
		}

		if (!environment.isClipper())
			list.unshift({
				group: '',
				items: [
					{
						name: 'extension',
						path: '/install/extension',
						title: t.s('browserExtension'),
						component: Extension
					}
				]
			});

		return list;
	}
}