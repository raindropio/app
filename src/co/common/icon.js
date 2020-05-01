import React from 'react'

export default class Icon extends React.PureComponent {
	displayName = "common/icon"

	render() {
		const { name, size, className, ...etc } = this.props

		if (!name) return null;
		
		var iconName
		try{iconName = '#'+require('~assets/icons/'+(size?size+"_":"")+name+'.svg').default.id}catch(e){}

		return (
			<span {...etc} className={"svgIcon svgIcon-size-"+(size||"default")+" "+className}>
				<svg>
					<use xlinkHref={iconName} />
				</svg>
			</span>
		);
	}
}

//export default function Icon({name, className = '', size="", style=null, id=null})