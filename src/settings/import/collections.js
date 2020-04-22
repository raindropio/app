import React from 'react'
import Icon from '~icon'
import t from '~t'
import config from '~config'

import helpers from './helpers'
import collectionsHelpers from '../../helpers/collections'
import Preloader from '../../co/common/preloader'
import UserStore from '../../stores/user'

export default class ImportCollections extends React.Component {
	displayName = "settings/import/collections"

	makeNode(arr,parentId) {
		var current = Promise.resolve();
		var queue = arr.map((item)=>{
			current =	current
							.then(()=>new Promise((res,rej)=>{
								var cleanItem = {
									title: item.title,
									expanded: true
								}
								if ((parentId)&&(UserStore.isPro()))
									cleanItem.parentId = parentId;
								else
									cleanItem.group = 0;

								collectionsHelpers.createBlank(cleanItem, {open:false, edit:false, quiet:true}, (cId)=>{
									this.state.progress++;
									this.setState({progress: this.state.progress});
									res(cId);
								});
							}))
							.then((savedId)=>{
								if (!savedId) return true;
								
								//bookmarks collectionId
								if (item.bookmarks)
									if (item.bookmarks.length)
										item.bookmarks.forEach((bookmark)=>{
											bookmark.collectionId=parseInt(savedId);
											helpers.bookmarks.push(bookmark);
										})

								//sub folders
								if (item.folders)
									if (item.folders.length)
										return Promise.all(this.makeNode(item.folders, savedId));

								return true;
							})
							.then(()=>new Promise((res,rej)=>{
								setTimeout(res, helpers.pause);
							}))
			return current;
		});

		return queue;
	}

	constructor(props) {
		super(props);

		var count=0;
		var getCount = (item)=>{
			if (!item) return;
			if (!item.length) return;

			item.forEach((child)=>{
				count++;

				if (child)
				if (child.folders)
					if (child.folders.length)
						getCount(child.folders);
			})
		}
		getCount(helpers.collections);

		this.state = {
			count: count,
			progress: 0
		}
	}

	componentDidMount() {
		if (!helpers.collections)
			return window.location.hash = "#/settings/import";

		Promise.all(this.makeNode(helpers.collections))
			.then(()=>{
				window.location.hash="#/settings/import/bookmarks";
			})
			.catch((reason)=>{
				alert("Error! Please send this bug report to info@raindrop.io:\n"+reason);
			})
	}

	render() {
		return (
			<div className="centerContentWrap desktop-behavior">
				<div className="centerContent">
					<div className="centerContentBlock">
						<h1 className="extraHeadLabel"><Preloader/> {t.s("importing")+" "+t.s("collectionsCount")+"..."}</h1>
						<progress value={this.state.progress} max={this.state.count} />
					</div>
				</div>
			</div>
		);
	}
}