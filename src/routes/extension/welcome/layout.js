import s from './layout.module.styl'
import React from 'react'
import { Outlet } from 'react-router-dom'

import Logo from '~assets/brand/icon_raw.svg?component'
import Screen from '~co/screen/basic'

export default ()=>{
	return (
		<Screen className={s.page} appSize='large'>
			<div className={s.content}>
				<Logo className={s.logo} />
				<Outlet />
			</div>
		</Screen>
	)
}