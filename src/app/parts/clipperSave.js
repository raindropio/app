import React from 'react'
import t from 't'
import Icon from 'icon'
import environment from '../../helpers/environment'
import Preloader from '../../co/common/preloader'

import BookmarksStore from '../../stores/bookmarks'
import KeyvalActions from '../../actions/keyval'
import ClipperActions from '../../actions/clipper'
import ClipperStore from '../../stores/clipper'
import bookmarksHelpers from '../../helpers/bookmarks'

export default class ClipperSave extends React.Component {
	constructor(props) {
		super(props);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.onClipperChange = this.onClipperChange.bind(this);

		//step initial
		var _state = ClipperStore.getState()

		if (!environment.isClipper())
			_state.unsupported = true;

		this.state = _state;
	}

	componentDidMount() {
		if (this.state.unsupported)
			return;

		this.unsubscribeActions = ClipperStore.listen(this.onClipperChange);
		ClipperActions.load();
	}

	componentWillUnmount() {
		if (this.unsubscribeActions)
        	this.unsubscribeActions();
    }

    onClipperChange(_state) {
    	this.setState(_state);
    }

	handleAdd() {
		this.setState({status: "loading"});

		bookmarksHelpers.insertLink({url: ClipperStore.getURL(), edit: true}, (result)=>{})
	}

	handleEdit() {
		if (!BookmarksStore.getBookmark(this.state.bookmark._id))
			window.location.hash="#/collection/"+this.state.bookmark.collectionId+"/"+encodeURIComponent(JSON.stringify([{key:"word",val:this.state.bookmark.link}]));
		
		setTimeout(()=>{
			KeyvalActions.set('mode-reader', {id: this.state.bookmark._id, tab: "edit"});
		},0)
	}

	render() {
		if (this.state.unsupported)
			return null;

		let content;

		switch(this.state.status){
			case "saved":
				content = (
					<a key="button" className="clipper-save-button status-saved" onClick={this.handleEdit}>
						<Icon name="new_note" className="clipper-save-button-icon" />{t.s("editMin")}&nbsp;{t.s("elements1")}
					</a>
				);
			break;

			case "init":
				content = (
					<a key="button" className="clipper-save-button status-init">
						
					</a>
				);
			break;

			case "loading":
				content = (
					<a key="button" className="clipper-save-button">
						<Preloader className="size-small"/>
					</a>
				);
			break;

			default:
				content = (
					<a key="button" className="clipper-save-button" onClick={this.handleAdd}>
						<Icon name="sort_rating_active" className="clipper-save-button-icon" />{t.s("addBookmark")}
					</a>
				);
			break;
		}

		return (
			<div className="clipper-save">
				{content}
			</div>
		);
	}
}