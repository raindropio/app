import Immutable from 'seamless-immutable'
const emptyArray = []

export const blankSpace = Immutable({
	lastAction: null,
	version: '',
	status: {
		main: 		'idle', //idle/empty/loading/error/loaded/notFound,
		nextPage: 	'idle', //idle/noMore/loading/error
	},
	query: {
		search: 	'',
		sort: 		'sort',
		page: 		0,
		ignore:		0
	},
	sorts: {
		'score':		{ enabled: false },
		'-created':		{ enabled: true },
		'created':		{ enabled: true },
		'title':		{ enabled: true },
		'-title':		{ enabled: true },
		'domain':		{ enabled: true },
		'-domain':		{ enabled: true },
		'sort':			{ enabled: true },
	},
	ids: emptyArray
})