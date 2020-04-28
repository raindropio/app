import Immutable from 'seamless-immutable'
import space from './space'
import single from './single'
import draft from './draft'
import selectMode from './selectMode'
import sort from './sort'

import {
	blankSelectMode
} from '../../helpers/bookmarks'

export default function(state = initialState, action={}){
	//Single
	const caseSingle = single(state,action);
	if (caseSingle) state = caseSingle;

	//Space
	const caseSpace = space(state,action);
	if (caseSpace) state = caseSpace;

	//Drafts
	const caseDraft = draft(state,action);
	if (caseDraft) state = caseDraft;

	//Select Mode
	const caseSelectMode = selectMode(state,action);
	if (caseSelectMode) state = caseSelectMode;

	//Sort
	const caseSort = sort(state,action)
	if (caseSort) state = caseSort

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
	drafts: {
		byId: {},
		linkStatus: {}
	},

	elements: {},
	meta: {},

	selectMode: blankSelectMode
})