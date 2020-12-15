import Immutable from 'seamless-immutable'
import items from './items'
import groups from './groups'
import single from './single'
import drafts from './drafts'
import sharing from './sharing'
import defaults from './defaults'
import reorder from './reorder'
import selectMode from './selectMode'

import { blankSelectMode } from '../../helpers/collections'

export default function(state = initialState, action={}){
	//Single (should be first)
	const caseSingle = single(state,action);
	if (caseSingle) state = caseSingle;
	
	//Items
	const caseItems = items(state,action);
	if (caseItems) state = caseItems;

	//Groups
	const caseGroups = groups(state,action);
	if (caseGroups) state = caseGroups;

	//Drafts
	const caseDrafts = drafts(state,action);
	if (caseDrafts) state = caseDrafts;

	//sharing
	const caseSharing = sharing(state,action);
	if (caseSharing) state = caseSharing;

	//Defaults
	const caseDefaults = defaults(state,action);
	if (caseDefaults) state = caseDefaults;

	//Reorder items when needed
	const caseReorder = reorder(state,action);
	if (caseReorder) state = caseReorder;

	//Reorder items when needed
	const caseSelectMode = selectMode(state,action);
	if (caseSelectMode) state = caseSelectMode;

	switch (action.type) {
		case 'RESET':{
			return initialState
		}
	
		default:
			return state;
	}
}

const initialState = Immutable({
	status: 'idle', /* idle, loading, loaded, error, empty */
	fromCache: false,
	items: {},
	groups: [],
	blankChildInParent: 0, //parentId where show blank child
	drafts: {},
	sharing: {
		status: {},
		sendInvitesTo: {},
		sendInvitesStatus: {},
		items: {}
	},
	selectMode: blankSelectMode,

	defaults: [
		{
			_id: 0,
			title: 'All',
			access: {
				level: 4
			}
		},
		{
			_id: -1,
			title: 'Unsorted',
			access: {
				level: 4
			}
		},
		{
			_id: -99,
			title: 'Trash',
			access: {
				level: 4
			}
		},
		{
			_id: -100,
			title: 'One click new item',
			access: {
				level: 4
			}
		},
		//don't put _id:101 here
	],

	defaultGroupTitle: 'My Collections'
})