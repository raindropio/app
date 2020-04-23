import React from 'react'
import network from '~network'
import { fromNow } from '~modules/strings'

import Pop from '~actions/pop'

import FavIcon from '../common/favIcon'
import Preloader from '../common/preloader'

export default class Sidebar extends React.Component {
	displayName = "reader/preview"

	UNSAFE_componentWillReceiveProps(nextProps) {
		if ((nextProps.item||{})._id != (this.props.item||{})._id){
			if (typeof document !== 'undefined')
				setTimeout(()=>{
					var elems = document.getElementsByClassName('readerContent');
					if (elems)
					for(var i in elems)
						if (elems[i].scrollTop)
							elems[i].scrollTop=0
				},0)
		}
	}

	previewSettings() {
		Pop.show("preview", {
			pin: "preview-settings-button",
			force: "vertical"
		})
	}

	render() {
		var className = "preview preview-type-"+(this.props.item||{}).type

		return (
			<div className={className}>
				{this.props.status=="loading" ? <div className="centerContentWrap status-loading"><Preloader /></div> : null}
				
				<div className={"previewContent "+this.props.status+(this.props.canAppearWithAnimation ? " " + this.props.canAppearWithAnimation + " canAppearWithAnimation" : "")}>
					<div className="domain"><FavIcon className="domainFavIcon" domain={network.cleanDomain((this.props.item||{}).domain)} /><b>{network.cleanDomain((this.props.item||{}).domain)}</b> &nbsp;&middot;&nbsp; {fromNow((this.props.item||{}).lastUpdate)}</div>
					<h1 className="previewTitle"><a href={(this.props.item||{}).link} target="_blank">{(this.props.item||{}).title}</a></h1>

					<div className="text-viewer-raindrop">
						<article ref="article" dangerouslySetInnerHTML={{__html: (this.props.item||{}).html||"" }}></article>
					</div>
				</div>
			</div>
		)
	}
}