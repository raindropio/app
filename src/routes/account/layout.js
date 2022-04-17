import s from './layout.module.styl'
import React from 'react'
import t from '~t'
import { Outlet } from 'react-router-dom'
import Screen from '~co/screen/basic'
import config from '~config'
import Logo from '~assets/brand/icon_raw.svg?component'

export default ()=>(
	<Screen className={s.page} appSize='large'>
		<div className={s.content}>
			<a href='https://raindrop.io' target='_blank' tabIndex='-1'>
				<Logo className={s.logo} />
			</a>

			<Outlet />
		</div>

		<footer className={s.footer}>
			&copy; 2013-{new Date().getFullYear()} Raindrop.io
			<a href={config.links.help.index} target='_blank'>{t.s('support')}</a>
		</footer>
	</Screen>
)