import React from 'react'

export default class Icon extends React.PureComponent {
	displayName = "common/icon"

	render() {
		if (!this.props.name) return null;
		
		var iconName
		try{iconName = '#'+require('~assets/icons/'+(this.props.size?this.props.size+"_":"")+this.props.name+'.svg').default.id}catch(e){}

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