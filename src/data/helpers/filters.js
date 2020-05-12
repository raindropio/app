import Immutable from 'seamless-immutable'

export const blankSpace = Immutable({
	status: 	'idle',
	broken:		{ count: 0 },
	important:	{ count: 0 },
	notag:		{ count: 0 },

	tags: 		[], //{_id, count}
	types: 		[], //{_id, count}
})