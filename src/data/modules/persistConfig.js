import Immutable from 'seamless-immutable'
import { createTransform } from 'redux-persist'

var throttle = 0

const ImmutableTransform = createTransform(
	//save
	(state, key) => state.asMutable ? state.asMutable({deep: true}) : state,
	//get
	(state, key) => Immutable(state)
)

let storage

//browser env
if (RAINDROP_ENVIRONMENT == 'browser')
	storage = require('localforage')
//react native
else
	storage = require('@react-native-async-storage/async-storage').default

const version = 38

export default {
	key: 'primary',
	version,
	migrate: state => {
		return Promise.resolve(
			state && state._persist && state._persist.version != version ? {} : state
		)
	},
	whitelist: [
		'backups',
		'config',
		'collections',
		'bookmarks',
		'filters',
		'tags',
		'user',
		'local',
		'rate',
		'predictions',
		...(process.env.NODE_ENV == 'development' ? ['import'] : []),

		//app specifics
		'app'
	],
	throttle,
	storage,
	transforms: [ImmutableTransform],
	debug: false,
	stateReconciler: false
}