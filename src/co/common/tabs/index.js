import s from './index.module.styl'
import React from 'react'

import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default class Tabs extends React.PureComponent {
	onItemClick = (e)=>{
		e.preventDefault()
		this.props.onChange(e.target.getAttribute('data-key'))
	}

	renderItem = ({ hidden, key, title, icon })=>{
		if (hidden) return null
		const active = (key == this.props.active)

		return (
			<Button 
				key={key} 
				data-key={key}
				tabIndex='-1'
				onClick={this.onItemClick} 
				className={s.item}
				variant={active && 'link'} 
				title={title}>
				{icon ? <Icon name={active ? icon+'_active' : icon} className='show-on-small-body' /> : null}
				<span className='hide-on-small-body'>{title}</span>
			</Button>
		)
	}

	render() {
		const { items=[], className='' } = this.props

		return (
			<div className={s.tabs+' '+className}>
				{items.map(this.renderItem)}
			</div>
		);
	}
}