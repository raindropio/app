import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'
import { isPro } from '~data/selectors/user'
import config from '~config'

import { Label, Checkbox, SubLabel } from '~co/common/form'

function SettingsAppAi ({ ai_suggestions, isPro, set }){
	return (
		<>
			<Label>AI</Label>
			<div>
				<Checkbox 
					disabled={!isPro}
					checked={isPro && ai_suggestions}
					onChange={()=>set('ai_suggestions', !ai_suggestions)}>
					{t.s('suggested')} {t.s('collectionsCount').toLowerCase()} {t.s('und')} {t.s('tags').toLowerCase()}
					<a href={config.links.help.suggestions.index} target='_blank'>[?]</a>
				</Checkbox>
				<SubLabel>You get your own private AI categorization model based on your data. Your data never used for training.</SubLabel>
			</div>
		</>
	)
}

export default connect(
	(state)=>({
		ai_suggestions: state.config.ai_suggestions,
		isPro: isPro(state)
	}),
	{ set }
)(SettingsAppAi)