import Reflux from 'reflux'
import Api from '~api'
import ls from 'localforage'

import BookmarkActions from '~actions/singleBookmark'

var _state = {
	item: {},
	status: ""
};

export default Reflux.createStore({
	init: function() {
		this.listenTo(BookmarkActions.load, this.onLoad);
	},

	onLoad: function(id) {
		if (_state.status == "loading")
			return;

		var cacheId = "singleElement_"+id;

		/*try{ls.getItem(cacheId)
			.then(function (val) {
				if ((val) && (_state.status=="loading")) {
					_state.item = val;
					_state.item = "done";
					_this.trigger(_state);
				}
			})
			.catch(function(e){});
		}catch(e){}*/

		_state.status = "loading";

		Api.get("raindrop/"+id, (json)=>{
			_state.item = json.item || {};

			if (json.result){
				_state.status = "done";
				//try{ls.setItem(cacheId, _state.item).then(function(){}).catch(function(e){})}catch(e){};
			}
			else{
				_state.status = "error";
				//try{ls.removeItem(cacheId)}catch(e){}
			}

			this.trigger(_state);
		});
	},

	getItem: function(_id) {
		if (_state.item._id == _id)
			return _state.item;
		else
			return null;
	}
});