import React from 'react'

var _ = {
  isEqual: require('lodash/isEqual')
}

export default class Icon extends React.PureComponent {
	displayName: "common/icon"

	/*shouldComponentUpdate(nextProps, nextState) {
		if (this.props.size != nextProps.size)
			return true;

		if (this.props.name != nextProps.name)
			return true;

		if (this.props.className != nextProps.className)
			return true;

		if (this.props.id != nextProps.id)
			return true;

		if (!_.isEqual(this.props.style, nextProps.style))
			return true;

		return false;
	}*/

	render() {
		if (!this.props.name) return null;
		
		var iconName
		try{iconName = require('../../icons/'+(this.props.size?this.props.size+"_":"")+this.props.name+'.svg')}catch(e){}

		return (
			<span id={this.props.id} className={"svgIcon svgIcon-size-"+(this.props.size||"default")+" "+this.props.className} style={this.props.style}>
				<svg>
					<use xlinkHref={iconName} />
				</svg>
			</span>
		);
	}
}

//export default function Icon({name, className = '', size="", style=null, id=null})