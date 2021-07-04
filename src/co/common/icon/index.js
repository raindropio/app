import s from './index.module.styl'
import React from 'react'

export default class Icon extends React.PureComponent {
	render() {
		const { name, ...etc } = this.props

		if (!name) return null;
		
		var iconName
		try{iconName = '#'+require('~assets/icons/'+(etc.size?etc.size+'_':'')+name+'.svg').default.id}catch(e){}

		return (
			<IconWrap {...etc}>
				<svg>
					<use xlinkHref={iconName} />
				</svg>
			</IconWrap>
		);
	}
}

export class IconWrap extends React.PureComponent {
	render() {
		const { className='', size='', enlarge='', children, ...etc } = this.props

		return (
			<span 
				{...etc} 
				className={s.icon+' '+className}
				data-size={size}
				data-enlarge={enlarge}>
				{children}
			</span>
		);
	}
}

export function Avatar({ src, className='', ...etc }) {
	if (!src)
		return (
			<Icon 
				{...etc}
				className={s.avatarDefault + ' ' + className}
				name='user_active' />
		)

	return (
		<IconWrap 
			{...etc}
			className={s.avatar + ' ' + className}>
			<img 
				src={src}
				loading='lazy'
				decoding='async' />
		</IconWrap>
	);
}