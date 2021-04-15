import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'

import { Label, Checkbox } from '~co/common/form'

function SettingsAppRaindropsSearchByScore ({ raindrops_search_by_score, set }){
	return (
		<>
			<Label>{t.s('defaultCollection-0')}</Label>
			<div>
				<Checkbox 
					checked={raindrops_search_by_score}
					onChange={()=>set('raindrops_search_by_score', !raindrops_search_by_score)}>
					{t.s('sortMin')} {t.s('byRelevance').toLowerCase()}
				</Checkbox>
			</div>
		</>
	)
}

export default connect(
	(state)=>({
		raindrops_search_by_score: state.config.raindrops_search_by_score
	}),
	{ set }
)(SettingsAppRaindropsSearchByScore)