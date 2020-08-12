import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { setTheme } from '~local/actions'

import { Label, Radio } from '~co/common/form'
import Icon from '~co/common/icon'

function SettingsAppTheme ({ theme, setTheme }){
	return (
		<>
			<Label>{t.s('interfaceStyle')}</Label>
			<div>
				{[['day', 'Light'], ['night', 'Dark']].map(([key, label])=>
					<Radio 
						key={key}
						name='theme'
						checked={theme==key}
						onChange={e=>setTheme(key, false)}>
						<Icon name={key} />
						{label}
					</Radio>
				)}
			</div>
		</>
	)
}

export default connect(
	(state)=>({
		theme: state.local.theme
	}),
	{ setTheme }
)(SettingsAppTheme)