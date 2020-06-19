import React from 'react'
import Icon from '~icon'
import t from '~t'
import config from '~config'
import Api from '~api'
import _ from 'lodash'

import helpers from './helpers'
import Preloader from '~co/common/preloader'

var iterator=0;

export default class ImportBookmarks extends React.Component {
	displayName = "settings/import/bookmarks"

	constructor(props) {
		super(props);

		this.state = {
			count: 0,
			progress: 0
		}
	}

	componentDidMount() {
		if (!helpers.bookmarks.length)
			return window.location.hash = "#/settings/import";

		var chunks = _.chunk(helpers.bookmarks, helpers.chunkSize)||[];
		this.setState({count: chunks.length});

		var current = Promise.resolve();
		var queue = chunks.map((a)=>{
			var chunk = JSON.parse(JSON.stringify(a));

			current =	current
							.then(()=>new Promise((res,rej)=>{
								//Dont check for duplicates
								if (helpers.importDuplicates)
									return res(true)

								var urls = chunk.map((item)=>item.url);

								Api.post("import/check/urls", {urls: urls}, (json)=>{
									if (json.result)
										if (json.duplicates)
											if (json.duplicates.length)
												chunk = chunk.filter((item)=>{
													var good = true;

													for(var i in json.duplicates)
														if (item.url == json.duplicates[i].link){
															good=false;
															break;
														}

													return good;
												});

									res(true);
								});
							}))
							.then(()=>new Promise((res,rej)=>{
								var done = ()=>{
									this.state.progress++;
									this.setState({progress: this.state.progress});
									return res(true);
								}

								chunk = chunk||[];
								if (!chunk.length)
									return done();

								Api.post("import/insert", {items: chunk, weight: helpers.bookmarks.length}, (json)=>{
									if (!json.result)
										if (json.error){
											console.log(chunk);
											return rej(json.error);
										}
									done();
								});
							}))
							.then(()=>new Promise((res,rej)=>{
								setTimeout(res, helpers.pause);
							}))
			return current;
		});

		Promise.all(queue)
			.then(()=>{
				window.location.hash="#/settings/import/done";
			})
			.catch((reason)=>{
				alert("Error! Please send this bug report to info@raindrop.io:\n"+reason);
			})
	}

	render() {
		return (
			<div className="centerContentWrap">
				<div className="centerContent">
					<div className="centerContentBlock">
						<h1 className="extraHeadLabel"><Preloader/> {t.s("importing")+" "+t.s("elements5")+"..."}</h1>
						<progress value={this.state.progress} max={this.state.count} /><br/><br/>

						<p className="subHeadLabel" style={{maxWidth:"500px"}}>{t.s("importingInfo2")}</p>
						
					</div>
				</div>
			</div>
		);
	}
}