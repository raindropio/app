import Reflux from 'reflux'
import Api from '~api'
import actions from '../actions/covers'

var _state = {
	query: '',
	prevQuery: null,
	loading: false,
	items: []
}

export default Reflux.createStore({
	init() {
		this.listenTo(actions.load, this.onLoad)
		this.listenTo(actions.search, this.onSearch)
	},

	onLoad() {
		if (_state.loading) return
		if (_state.items.length && _state.query === _state.prevQuery) return
		
		_state.loading = true
		_state.items = []
		this.trigger(_state)

        Api.get(`collections/covers/${encodeURIComponent(_state.query||'')}`, (json)=>{
			_state.items = json.items || []
			_state.prevQuery = _state.query
			_state.loading = false
			
			this.trigger(_state)
        })
	},

	onSearch(query) {
		_state.query = query
		this.onLoad()
	},

	getState() {
		return _state;
	}
})