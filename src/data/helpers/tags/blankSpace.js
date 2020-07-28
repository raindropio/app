import Immutable from 'seamless-immutable'

export const blankSpace = Immutable({
	status: 	'idle', //idle, loading, loaded, error
	tags: 		[],     //{_id, count, query}
	query:		{ search: '' }, //used only to prevent overrides
})