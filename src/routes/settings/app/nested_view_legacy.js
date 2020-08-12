import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'

import { Label, Checkbox } from '~co/common/form'

function SettingsAppNestViewLegacy ({ nested_view_legacy, set }){
	return (
		<>
			<Label>{t.s('nestedCollections')}</Label>
			<div>
				<Checkbox 
					checked={nested_view_legacy}
					onChange={()=>set('nested_view_legacy', !nested_view_legacy)}>
					{t.s('old')} {t.s('view').toLowerCase()}
				</Checkbox>
			</div>
		</>
	)
}

export default connect(
	(state)=>({
		nested_view_legacy: state.config.nested_view_legacy
	}),
	{ set }
)(SettingsAppNestViewLegacy)