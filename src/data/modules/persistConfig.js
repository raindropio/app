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
else {
	const mmkv = require('react-native-mmkv').createMMKV({ id: 'redux-persist' })

	storage = {
		getItem: (key) => Promise.resolve(mmkv.getString(key) ?? null),
		setItem: (key, value) => { mmkv.set(key, value); return Promise.resolve(true) },
		removeItem: (key) => { mmkv.remove(key); return Promise.resolve() }
	}
}

const version = 42

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