import s from './index.module.styl'
import React from 'react'

export default class Icon extends React.PureComponent {
	displayName = 'common/icon'

	render() {
		const { name, className='', size='', enlarge='', ...etc } = this.props

		if (!name) return null;
		
		var iconName
		try{iconName = '#'+require('~assets/icons/'+(size?size+'_':'')+name+'.svg').default.id}catch(e){}

		return (
			<span 
				{...etc} 
				className={s.icon+' '+className}
				data-size={size}
				data-enlarge={enlarge}>
				<svg>
					<use xlinkHref={iconName} />
				</svg>
			</span>
		);
	}
}