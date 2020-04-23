import Reflux from 'reflux'
import ClipperActions from '~actions/clipper'
import BookmarksStore from './bookmarks'
import LastBookmarkActions from '~actions/lastBookmark'

import environment from '~modules/environment'
import { getCurrentTab, setButtonStatus } from '~modules/clipper'

var prepareState = (item,defaultStatus="")=>{
	var s = {
		status: defaultStatus,
		bookmark: {}
	}

	if (item){
		s.url = item.link;

		if (item.collectionId == -99)
			s.status = "removed";
		else{
			s.bookmark = item;
			s.status = "saved";
		}
	}

	var finalURL = s.url||_state.url;
	if (finalURL)
		setButtonStatus({
			url: finalURL,
			saved: (s.status=="saved"),
			loading: false
		})

	return s;
}
var _state = {};
_state = prepareState(false,"init");

export default Reflux.createStore({
	init() {
		if (environment.isClipper()){
			this.listenTo(ClipperActions.load, this.onLoad);
			this.listenTo(LastBookmarkActions.insert, this.onBookmarkInsert);
			this.listenTo(LastBookmarkActions.update, this.onBookmarkInsert);
			this.listenTo(LastBookmarkActions.remove, this.onBookmarkRemove);

			window.clipperOnLoad = this.onLoad
		}
	},

	onLoad() {
		getCurrentTab((tab)=>{
			if (!tab)
				return;

			_state.url = tab.url;
			this.loadURL()
		})
	},

	onBookmarkInsert(item) {
		if (item.link==_state.url){
			this.loadURL()
		}
	},

	onBookmarkRemove(item) {
		if (item._id==_state.bookmark._id){
			_state = Object.assign({}, {url:_state.url}, prepareState(false))

			this.trigger(_state);
		}
	},

	loadURL() {
		BookmarksStore.onLoadBookmark({url: _state.url, nohtml: true}, (bookmark)=>{
			_state = Object.assign({}, {url:_state.url}, prepareState(bookmark));

			this.trigger(_state);
		})
	},

	getState() {
		return _state;
	},

	getURL() {
		return _state.url||"";
	}
})