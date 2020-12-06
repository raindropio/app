import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import persistConfig from './modules/persistConfig'
import ApiError from './modules/error'

//Roots
const getRootSaga = ()=>
	require('./sagas').default
const getRootReducer = (additional={})=>
	persistReducer(persistConfig, combineReducers({...require('./reducers').default, ...additional}))

const composeEnhancers = process.env.NODE_ENV!='production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose

//Configure store
var store, persistor, sagaMiddleware;
const withLocalReducer = (additional)=>{
	sagaMiddleware = createSagaMiddleware({
		onError: e => {
			if (process.env.NODE_ENV!='production')
				console.error(e)
			
			if (typeof e != 'object' ||
				e instanceof ApiError == false)
				throw e
		}
	})

	store = createStore(
		getRootReducer(additional),
		composeEnhancers(
			applyMiddleware(
				sagaMiddleware //should be last!!!
			)
		)
	)

	//Configure middlewares
	persistor = persistStore(store)
	sagaMiddleware.run(getRootSaga())

	return {store, persistor}
}

export {store, persistor, withLocalReducer}