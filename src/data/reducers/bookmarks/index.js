import Immutable from 'seamless-immutable'
import space from './space'
import single from './single'
import draft from './draft'
import selectMode from './selectMode'
import sort from './sort'
import html from './html'
import recent from './recent'
import highlights from './highlights'

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
	
	//Html
	const caseHtml = html(state,action)
	if (caseHtml) state = caseHtml

	//Recent
	const caseRecent = recent(state,action)
	if (caseRecent) state = caseRecent

	//Highlights
	const caseHighlights = highlights(state,action)
	if (caseHighlights) state = caseHighlights

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
	recent: {
		search: [] //{_id, collectionRef}
	},

	drafts: {}, //{ number|string: {} }

	elements: {},
	meta: {},
	html: {},
	suggestedFields: {}, //{ urlString: { collections: [], tags: [] } }

	selectMode: blankSelectMode
})