import Immutable from 'seamless-immutable'

export const blankSpace = Immutable({
	lastAction: null,
	version: 	'',
	status: 	'idle', //idle, loading, loaded, error
	tags: 		[],     //{_id, count, query}
	query:		{ search: '' }, //used only to prevent overrides
})