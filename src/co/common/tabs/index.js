import s from './index.module.styl'
import React from 'react'

import Button from '~co/common/button'
import Select from '~co/common/select'
import Icon from '~co/common/icon'

export default class Tabs extends React.PureComponent {
	static defaultProps = {
		items: [],		//{ hidden:false, key:'', title:'', icon:'' }
		active: null
	}

	onItemClick = e => {
		e.preventDefault()
		this.props.onChange(e.target.getAttribute('data-key'))
	}

	onSelectChange = e => {
		this.props.onChange(e.target.value)
	}

	renderItem = ({ hidden, key, title, icon })=>{
		if (hidden) return null
		const active = (key == this.props.active)

		return (
			<Button 
				key={key} 
				data-key={key}
				onClick={this.onItemClick} 
				className={s.item}
				variant={active && 'active'} 
				title={title}>
				{icon ? <Icon name={active ? icon+'_active' : icon} /> : null}
				<span className='hide-on-small-body'>{title}</span>
			</Button>
		)
	}

	renderOption = ({ hidden, key, title })=>{
		if (hidden) return null

		return (
			<option key={key} value={key}>
				{title}
			</option>
		)
	}

	render() {
		const { items=[], className='', active } = this.props

		return (
			<>
				<div className={s.tabs+' '+className+' hide-on-small-body'}>
					{items.map(this.renderItem)}
				</div>

				<Select
					variant='outline'
					className={className+' show-on-small-body'}
					value={active}
					onChange={this.onSelectChange}>
					{items.map(this.renderOption)}
				</Select>
			</>
		)
	}
}