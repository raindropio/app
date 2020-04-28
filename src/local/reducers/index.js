import Immutable from 'seamless-immutable'
import app from './app'

const reducer = (state = initialState, action)=>{
	const _app = app(state,action);
	if (_app) state = _app;

	switch (action.type) {
		default:
			return state;
	}
}

const initialState = Immutable({
	theme: 'default'
})

export default {
	local: reducer
}