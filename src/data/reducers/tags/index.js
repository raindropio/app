import Immutable from 'seamless-immutable'
import items from './items'
import single from './single'
import recent from './recent'

export default function(state = initialState, action={}){
	//Items
	const caseItems = items(state,action);
	if (caseItems) state = caseItems;

	//Single
	const caseSingle = single(state,action);
	if (caseSingle) state = caseSingle;

	//Recent
	const caseRecent = recent(state,action);
	if (caseRecent) state = caseRecent;

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
	recent: []
})