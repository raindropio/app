import Immutable from 'seamless-immutable'

export const blankSpace = Immutable({
	autoLoad:	false,
	status: 	'idle', //idle, loading, loaded, error
	items:		[] //{_id, count, query}
})