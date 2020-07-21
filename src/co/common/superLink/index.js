import s from './index.module.styl'
import React from 'react'
import { Link } from 'react-router-dom'

export default class SuperLink extends React.PureComponent {
	static defaultProps = {
		active: false,
		tabIndex: -1
	}

	onMouseDown = (e)=>{
		e.currentTarget.focus()
		this.props.onMouseDown && this.props.onMouseDown(e)
	}

	onKeyDown = (e)=>{
		switch(e.keyCode){
			case 38: //top
				e.preventDefault()
				focusNav(e.currentTarget, 'prev')
			break;

			case 40: //bottom
				e.preventDefault()
				focusNav(e.currentTarget, 'next')
            break;

            default:
            	if (this.props.onKeyDown)
            		return this.props.onKeyDown(e)
            break;
		}
	}

	render() {
		const { className, active, tabIndex, ...other } = this.props
		const Component = other.to ? Link : 'a'

		return (
			<Component
				{...other}
				className={className+' '+s.superLink}
				tabIndex={active ? tabIndex : '-1'}
				data-tab-index={tabIndex}
				onMouseDown={this.onMouseDown}
				onKeyDown={this.onKeyDown} />
		)
	}
}

function focusNav(elem, dir='next') {
	const tabIndex = elem.getAttribute('data-tab-index')
	if (!tabIndex || tabIndex == '-1') return

	const brothers = document.querySelectorAll(`[data-tab-index="${tabIndex}"]`)

	for(var i = 0; i<brothers.length; i++)
		if (brothers[i] == elem){
			if (dir=='next' && brothers[i+1]){
				brothers[i+1].focus()
				brothers[i+1].click()
			}
			else if (dir=='prev' && brothers[i-1]){
				brothers[i-1].focus()
				brothers[i-1].click()
			}
			
			break
		}
}