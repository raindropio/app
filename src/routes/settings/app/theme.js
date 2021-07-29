import s from './theme.module.styl'
import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { setTheme } from '~local/actions'

import { Label } from '~co/common/form'

class SettingsAppTheme extends React.PureComponent {
	themes = [
		['day', {app: 'day', sidebar: 'day'}],
		['night', {app: 'night', sidebar: 'night'}],
		['midnight', {app: 'day', sidebar: 'night'}],
		['sunset', {app: 'sunset', sidebar: 'sunset'}]
	]

	onThemeClick = e=>{
		e.preventDefault()

		this.props.setTheme(this.themes[parseInt(e.currentTarget.getAttribute('data-index'))][1])
	}

	render() {
		const { theme } = this.props

		return (
			<>
				<Label>{t.s('interfaceStyle')}</Label>
				<div>
					<div className={s.selector}>
						{this.themes.map(([key, item], index)=>
							<a
								key={key}
								className={s.theme}
								data-active={item.app == theme.app && item.sidebar == theme.sidebar}
								data-index={index}
								tabIndex='0'
								href=''
								onClick={this.onThemeClick}>
								<div 
									data-theme={item.sidebar}
									className={s.sidebar}>
									――――
									――
									―――
								</div>

								<div 
									data-theme={item.app}
									className={s.main}>
									<span /><span />
									<span /><span />
									<span />
								</div>
							</a>
						)}
					</div>
				</div>
			</>
		)
	}
}

export default connect(
	(state)=>({
		theme: state.local.theme
	}),
	{ setTheme }
)(SettingsAppTheme)