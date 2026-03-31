import React from 'react'
import t from '~t'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'
import { isPro } from '~data/selectors/user'
import config from '~config'

import { Label, Checkbox, SubLabel } from '~co/common/form'

function SettingsAppAi ({ ai_suggestions, ai_assistant, isPro, set }){
	return (
		<>
			<Label>AI</Label>
			<div>
				<Checkbox 
					checked={ai_assistant}
					onChange={()=>set('ai_assistant', !ai_assistant)}>
					{t.s('ask')} AI
					<a href={config.links.help.stella.index} target='_blank'>[?]</a>
				</Checkbox>

				<Checkbox 
					checked={ai_suggestions}
					onChange={()=>set('ai_suggestions', !ai_suggestions)}>
					{t.s('suggestedCollectionsAndTags')}
				</Checkbox>

				<SubLabel>
					{!isPro && <>Only available for <Link to='/settings/pro'>Pro</Link>. </>}
					{t.s('aiDescription')}
				</SubLabel>
			</div>
		</>
	)
}

export default connect(
	(state)=>({
		ai_suggestions: state.config.ai_suggestions,
		ai_assistant: state.config.ai_assistant,
		isPro: isPro(state)
	}),
	{ set }
)(SettingsAppAi)