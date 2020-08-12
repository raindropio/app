import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { setAppSize } from '~local/actions'

import { Label, Checkbox } from '~co/common/form'

function SettingsAppSize ({ appSize, setAppSize }){
	return (
		<>
			<Label>{t.s('fontSize')}</Label>
			<div>
				<Checkbox 
					checked={appSize=='large'}
					onChange={()=>setAppSize(appSize == 'large' ? '' : 'large')}>
					{t.s('large')}
				</Checkbox>
			</div>
		</>
	)
}

export default connect(
	(state)=>({
		appSize: state.local.appSize,
		theme: state.local.theme
	}),
	{ setAppSize }
)(SettingsAppSize)