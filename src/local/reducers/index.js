import Immutable from 'seamless-immutable'
import localStorage from '~modules/localStorage'
import app from './app'
import pause from './pause'

const reducer = (state = initialState, action)=>{
	const _app = app(state,action)
	if (_app) state = _app

	const _pause = pause(state,action)
	if (_pause) state = _pause

	switch (action.type) {
		default:
			return state
	}
}

let initialTheme = {
	app: 'day',
	sidebar: 'day',
	auto: true
}

//speed initial load by geting theme from localstorage
try{
	const theme = JSON.parse(localStorage.getItem('_theme'))
	if (theme.app)
		initialTheme = theme
} catch(e){}

const initialState = Immutable({
	theme: initialTheme,
	appSize: 'default',
	collectionsSearchResults: true,
	pause: '',
	highlightsExpanded: true,
	visitedSpace: { cId: 0, search:'' },
})

export default {
	local: reducer
}