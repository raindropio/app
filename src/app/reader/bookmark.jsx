import React from 'react'
import t from 't'

import singleBookmarkStore from '../../stores/singleBookmark'
import bookmarksStore from '../../stores/bookmarks'

import Preloader from '../../co/common/preloader'

export default function(Component) { return class ReaderBookmark extends React.Component {
	displayName: "reader/bookmark"

	constructor(props) {
		super(props);

		this.state = this.prepareState(props);
	}

	prepareState(props) {
		var state = {};

		if (!this.state)
			state.item = props.item;

		var htmlItem = singleBookmarkStore.getItem(props.item._id)||{};
		state.status = "loading";

		if (Object.keys(htmlItem).length!=0){
			state.item = props.item;
			state.item.html = htmlItem.html;
			state.status = "done";
		}
		else
			singleBookmarkStore.onLoad(props.item._id);

		if (this.state)
		if (this.state.item)
		if (this.state.item._id != props.item._id){
			state.canAppearWithAnimation = (Object.keys(this.state.item).length != 0 ? "next" : false);
			if (state.canAppearWithAnimation){
				state.canAppearWithAnimation = bookmarksStore._comparePrevOrNext(this.state.item._id, props.item._id);
			}
		}

		return state;
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.prepareState(nextProps));
	}

	onBookmarkChange(state) {
		var htmlItem = state.item||{};
		this.state.item = this.props.item||{};
		this.state.item.html = htmlItem.html||"";

		this.setState({item: this.state.item, status: state.status})
	}

	componentDidMount() {
		this.unsubscribeBookmarks = singleBookmarkStore.listen(this.onBookmarkChange.bind(this));
	}

	componentWillUnmount() {
		this.unsubscribeBookmarks();
	}

	render() {
		return <Component {...this.props} {...this.state} />;
	}
}}