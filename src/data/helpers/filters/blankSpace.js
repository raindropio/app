import Immutable from 'seamless-immutable'

export const blankSpace = Immutable({
	status: 	'idle', //idle, loading, loaded, error
	items:		[] //{_id, count, query}
})