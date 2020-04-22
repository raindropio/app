import React from 'react'
import t from 't'
import config from 'config'

import collectionsStore from '../../../stores/collections'
import Pop from '../../../actions/pop'

export default class RSS extends React.Component {
	componentDidUpdate() {
        this.props.onUpdate();
    }
    
	render() {
		var privateRSS;
		var collection = collectionsStore.getCollection(this.props._id);

		if (collection.uniqKey)
			privateRSS = (
				<figure className="fieldWrap">
					<label className="fieldName" htmlFor="publicRSS">{t.s("privateRSSfeed")}</label>
					<input type="text"
							id="publicRSS"
							className="field"
							value={config.host+"/feed/"+collection.uniqKey}
							onChange={()=>{}} />
				</figure>
			);

		return (
			<div className="superForm">
				<figure className="fieldWrap">
					<label className="fieldName" htmlFor="publicRSS">{t.s("publicRSSfeed")}</label>
					<input type="text"
							id="publicRSS"
							className="field"
							value={collection.public ? config.host+"/collection/"+this.props._id+"/feed" : t.s("privateCollectionURL")}
							disabled={!collection.public}
							onChange={()=>{}} />
				</figure>

				{privateRSS}

				<br/>
			</div>
		);
	}
}