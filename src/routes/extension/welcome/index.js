import s from './index.module.styl'
import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Logo from '~assets/brand/icon_raw.svg?component'
import Screen from '~co/screen/basic'
import Activate from './activate'
import Greeting from './greeting'

export default ({ match: { path } })=>{
	return (
		<Screen className={s.page} appSize='large'>
			<div className={s.content}>
				<Logo className={s.logo} />

				<Switch>
					<Route path={`${path}/activate`} component={Activate} />
					<Route component={Greeting} />
				</Switch>
			</div>
		</Screen>
	)
}