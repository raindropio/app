import Reflux from 'reflux'
import Api from 'api'
import actions from '../actions/duplicates'

var _ = {
	uniq: require('lodash/uniq'),
	remove: require('lodash/remove'),
	groupBy: require('lodash/groupBy'),
	filter: require('lodash/filter'),
	flatten: require('lodash/flatten')
}

export default Reflux.createStore({
	init() {
		this.listenTo(actions.load, this.onLoad);
		this.listenTo(actions.loadMore, this.onLoadMore);
		this.listenTo(actions.reload, this.onReload);
		this.listenTo(actions.changeSelection, this.onChangeSelection);
		this.listenTo(actions.changeSelectionRule, this.onChangeSelectionRule);
		this.listenTo(actions.removeSelected, this.onRemoveSelected);
	},

	onLoad(params) {
		_resetState();
		this.trigger(_state);

		this.getItems();
	},

	onLoadMore() {
		if (_state.step != "loaded") return;
		if (!_state.more) return;

		_state.page++;
		_state.httpActivity = true;
		this.trigger(_state);

		this.getItems();
	},

	onReload() {
		this.onLoad();
	},

	onChangeSelection(_id) {
		const index = _state.selected.indexOf(_id);
		if (index==-1)
			_state.selected.push(_id);
		else
			_state.selected.splice(index, 1)

		//_state.fullyRemovedCount
		_state.items
			.forEach((item, itemIndex)=>{
				var currentDropInThisItem = item.drops.some((d)=>d._id==_id);
				if (!currentDropInThisItem) return;

				var selectedDrops = item.drops.filter((drop)=>{
					return _state.selected.indexOf(drop._id)!=-1?true:false
				})

				if (selectedDrops.length==item.drops.length)
					_state.fullyRemoved.push(item._id)
				else
					_state.fullyRemoved = _state.fullyRemoved.filter((i)=>i!=item._id)

				_state.fullyRemoved = _.uniq(_state.fullyRemoved)
			})

		this.trigger(_state);
	},

	onChangeSelectionRule(val) {
		_state.selected = [];
		_state.fullyRemoved = [];
		_state.selectionRule = val;
		this.updateSelection(_state.items);
		this.trigger(_state);
	},

	onRemoveSelected() {
		var current = Promise.resolve();
		const queue = _state.selected.map((_id)=>{
			current = current.then(()=>this.removeBookmark(_id))
			return current;
		})

		return Promise.all(queue)
			.then(()=>{
				this.onReload()
			})
	},

	getItems() {
		Api.get('duplicates?page='+_state.page, ({items=[], count=0})=>{
			if (items.length){
				if (!_state.page)
					_state.items = items
				else
					_state.items = _state.items.concat(items)

				_state.itemsCount = count;

				this.updateSelection(items)
			}

			_state.httpActivity = false;
			_state.step = (_state.items.length ? "loaded" : "empty")
			_state.more = (items.length && items.length<count ?true:false)

			this.trigger(_state)
		})
	},

	updateSelection(items=[]) {
		items.forEach((item)=>{
			switch(_state.selectionRule){
				case "old":
					item.drops.forEach((d,index)=>{
						if (index>0)
							_state.selected.push(d._id)
					})
				break;

				case "new":
					item.drops.forEach((d,index)=>{
						if (index==0)
							_state.selected.push(d._id)
					})
				break;

				case "sameCollection":
					_.flatten(
						_.filter(
							_.groupBy(item.drops, 'collection.$id'), 
							(childs)=>childs.length>1
						)
					).forEach((d)=>{
						if (d._id != item._id)
							_state.selected.push(d._id)
					})
				break;
			}
		})

		_state.selected = _.uniq(_state.selected)
	},

	removeBookmark(_id) {
		return new Promise((res, rej)=>{
			Api.del("raindrop/"+_id, ({result=false})=>{
				if (result) res(true); else rej('Can\'t remove bookmark')
			})
		})
	},

	getState() {
		return _state;
	}
})

var _state = {
	/*
		step
			init - loading initial part of items
			loaded - stop loading and have items
			empty - loaded, no items
		httpActivity - someting is loading
	*/
}
const _resetState = ()=>{
	_state.itemsCount = 0;
	_state.items = [];
	_state.selected = [];
	_state.fullyRemoved = [];
	_state.selectionRule = "old";
	_state.step = "init";
	_state.page = 0;
	_state.more = true;
	_state.httpActivity = true;
}
_resetState();