import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'

import { Label, Checkbox } from '~co/common/form'

function SettingsAppAi ({ ai_organize, set }){
	return (
		<>
			<Label>AI</Label>
			<div>
				<Checkbox 
					checked={ai_organize}
					onChange={()=>set('ai_organize', !ai_organize)}>
					Organization Tips
				</Checkbox>
			</div>
		</>
	)
}

export default connect(
	(state)=>({
		ai_organize: state.config.ai_organize
	}),
	{ set }
)(SettingsAppAi)