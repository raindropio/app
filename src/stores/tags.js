import Reflux from 'reflux'
import Api from 'api'
import actions from '../actions/tags'
import _ from 'lodash'

export default Reflux.createStore({
	init() {
		this.listenTo(actions.load, this.onLoad);
		this.listenTo(actions.reload, this.onReload);
		this.listenTo(actions.changeSelection, this.onChangeSelection);
		this.listenTo(actions.selectAll, this.onSelectAll);
		this.listenTo(actions.unselectAll, this.onUnselectAll);

		this.listenTo(actions.removeItem, this.onRemoveItem);
		this.listenTo(actions.updateItem, this.onUpdateItem);
		this.listenTo(actions.removeSelected, this.onRemoveSelected);
		this.listenTo(actions.mergeSelected, this.onMergeSelected);

		this.listenTo(actions.changeSort, this.onChangeSort);
	},

	onLoad(params) {
		_resetState();
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

		this.trigger(_state);
	},

	onSelectAll() {
		_state.selected = _state.items.map((item)=>item._id)
		this.trigger(_state);
	},

	onUnselectAll() {
		_state.selected = [];
		this.trigger(_state);
	},

	onRemoveItem(tag="") {
		this.setLoadingItem(tag, true)
		this.trigger(_state);

		return new Promise((res, rej)=>{
			Api.del('tag?tag='+encodeURIComponent(tag), ({result})=>{
				this.setLoadingItem(tag, false)

				if (result){
					_state.items = _state.items.filter((item)=>item.title!=tag)
					
					res(true)
				}else {
					rej("can' remove");
				}
				
				this.trigger(_state);
			})
		})
	},

	onUpdateItem({tag="", replace=""}) {
		if (!replace)
			replace=tag;

		this.setLoadingItem(tag, true)
		this.trigger(_state);

		return new Promise((res, rej)=>{
			Api.put('tag', {tag, replace}, ({result})=>{
				this.setLoadingItem(tag, false)

				if (result){
					_state.items = _state.items.map((item)=>{
						if (item.title == tag)
							return Object.assign({}, item, {title: replace})
						
						return item;
					})

					_state.items = sortItems(_state.items)
					
					res(true)
				}else {
					rej("can't rename");
				}
				
				this.trigger(_state);
			})
		})
	},

	onRemoveSelected() {
		var current = Promise.resolve();
		const queue = _state.selected.map((_id)=>{
			current = current.then(()=>this.onRemoveItem(getTitleById(_id)))
			return current;
		})

		return Promise.all(queue)
			.then(()=>{
				this.onUnselectAll()
			})
	},

	onMergeSelected(replace) {
		return new Promise((res, rej)=>{
			const tags = _state.selected.map((_id)=>getTitleById(_id))

			Api.put('mergetag', {tags, replace}, ({result})=>{
				if (result)
					res(true)
				else
					rej("can't merge")
				this.onReload()
			})
		})
	},

	onChangeSort(key) {
		_state.sort = key;
		_state.items = sortItems(_state.items)

		this.trigger(_state);
	},

	setLoadingItem(tag,isLoading) {
		_state.loading = _.uniq(_state.loading)

		_state.items.some((item)=>{
			if (item.title==tag){
				if (isLoading)
					_state.loading.push(item._id)
				else{
					const index = _state.loading.indexOf(item._id);
					_state.loading.splice(index, 1)
				}

				return true;
			}
			return false;
		})
	},

	getItems() {
		Api.get('tags', ({items=[], count=0})=>{
			if (items.length){
				if (!_state.page)
					_state.items = cleanItems(items)
				else
					_state.items = _state.items.concat(cleanItems(items))

				_state.items = sortItems(_state.items)
				_state.itemsCount = _state.items.length||0;
			}

			_state.httpActivity = false;
			_state.step = (_state.items.length ? "loaded" : "empty")
			_state.more = (items.length && items.length<count ?true:false)

			this.trigger(_state)
		})
	},

	getState() {
		return _state;
	},

	getSortingValues() {
		return {
			'count': 'byBookmarksCount',
			'title': 'byName'
		}
	},

	getTitleById(a) {
		return getTitleById(a)
	}
})

const cleanItems = (items=[])=>{
	if (!items.length) return []

	return items.map((item)=>{
		return {
			_id: _.uniqueId(),
			title: item._id,
			count: item.count
		}
	})
}

const sortItems = (items=[])=>{
	if (!items.length) return []
	
	var nItems = _.orderBy(
		items,
		(item)=>{
			switch(_state.sort) {
				case 'title': return item.title.toLowerCase()
				default: return item[_state.sort]
			} 
		}, 
		[_state.sort=="count" ? 'desc' : 'asc']
	)

	return nItems;
}

const getTitleById = (_id)=>{
	var title="";
	_state.items.some((item)=>{
		if (item._id == _id){
			title = item.title;
			return true;
		}
		return false;
	})

	return title;
}

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
	_state.loading = [];
	_state.step = "init";
	_state.sort = "title";
	_state.page = 0;
	_state.more = true;
	_state.httpActivity = true;
}
_resetState();