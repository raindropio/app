import Immutable from 'seamless-immutable'
import items from './items'
import suggested from './suggested'
import single from './single'

export default function(state = initialState, action={}){
	//Items
	const caseItems = items(state,action);
	if (caseItems) state = caseItems;

	//suggested
	const caseSuggested = suggested(state,action);
	if (caseSuggested) state = caseSuggested;

	//Single
	const caseSingle = single(state,action);
	if (caseSingle) state = caseSingle;

	switch (action.type) {
		case 'RESET':{
			return initialState
		}
	
		default:
			return state;
	}
}

const initialState = Immutable({
	spaces: {},
	suggested: {}
})