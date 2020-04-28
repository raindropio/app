import Immutable from 'seamless-immutable'
import items from './items'
import single from './single'
import { blankItems } from '../../helpers/tags'

export default function(state = initialState, action={}){
	//Items
	const caseItems = items(state,action);
	if (caseItems) state = caseItems;

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
	status: 'idle',
	items: blankItems,
	suggested: {}
})