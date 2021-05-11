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
if (RAINDROP_ENVIRONMENT == 'browser')
	storage = require('localforage')
else
	storage = require('react-native').Platform.select({
		//user default storage on ios, so storage is shared between app and extension(s)
		ios: {
			getItem: require('rn-user-defaults').default.get,
			setItem: require('rn-user-defaults').default.set,
			removeItem: require('rn-user-defaults').default.clear,
		},
		android: require('@react-native-community/async-storage').default
	})

const version = 21

export default {
	key: 'primary',
	version,
	migrate: state => {
		return Promise.resolve(
			state && state._persist && state._persist.version != version ? {} : state
		)
	},
	whitelist: [
		'config',
		'collections',
		'bookmarks',
		'filters',
		'tags',
		'user',
		'local',
		...(process.env.NODE_ENV == 'development' ? ['import'] : []),

		//app specifics
		'app'
	],
	throttle,
	storage,
	transforms: [ImmutableTransform],
	debug: true,
	stateReconciler: false
}