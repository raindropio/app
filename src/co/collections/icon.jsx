import React from 'react'
import Icon from 'icon'
import network from 'network'

export default class CollectionIcon extends React.PureComponent {
	displayName: "collections/icon"

	render() {
		if ((this.props._id < 0)||(!this.props.src)) {
			var svgIcon = "", prefix = (this.props.active ? "_active" : "");
			switch(this.props._id){
				case 0: svgIcon = "cloud"+prefix; break;
				case -1: svgIcon = "inbox"+prefix; break;
				case -99: svgIcon = "trash"+prefix; break;
				default: svgIcon = "default_collection"+prefix; break;
			}

			return <Icon name={svgIcon} className={"collectionIcon "+this.props.className||""} size={this.props.size} />;
		}else
			return <img src={network.fixURL(this.props.src)} className={"collectionIcon "+this.props.className||""} />;
	}
}