import Reflux from 'reflux'
import actions from '../actions/keyval'
import Api from 'api'
import _ from 'lodash'

const persist_keys_Key = "keyval_persist_keys";

var _all = {}, _persist_keys = JSON.parse(Api.getItem(persist_keys_Key))||[];

//init persist keys
for(var i in _persist_keys){
	var tempVal = Api.getItem(persist_keys_Key+_persist_keys[i]);
	if (tempVal) _all[_persist_keys[i]] = tempVal;
}

export default Reflux.createStore({
	listenables: actions,
	
	onAll: function() {
		return _all;
	},
	onGet: function(key) {
		return _all[key]||null;
	},
	onSet: function(key,val,persist) {
		if (_all[key] == val)
			return;
		
		_all[key] = val;
		this.trigger(_all);

		if (persist){
			_persist_keys.push(key);
			Api.setItem(persist_keys_Key+key, val);

			this.persistKeys();
		}
	},
	onRemove: function(key,persist) {
		if (_all[key]) {
			delete _all[key];
			this.trigger(_all);
		}

		if (persist){
			Api.removeItem(persist_keys_Key+key);

			var index = _persist_keys.indexOf(key);
			if (index!=-1){
				_persist_keys.splice(index,1);
				this.persistKeys();
			}
		}
	},
	onToggle: function(key,persist) {
		if (_all[key])
			this.onRemove(key,persist);
		else
			this.onSet(key,true,persist);
	},

	onTouch: function() {
		this.trigger(_all);
	},

	persistKeys: function() {
		_persist_keys = _.uniq(_persist_keys);
		Api.setItem(persist_keys_Key, JSON.stringify(_persist_keys));
	}
})