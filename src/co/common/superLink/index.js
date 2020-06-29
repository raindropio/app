import s from './index.module.styl'
import React from 'react'
import { Link } from 'react-router-dom'

export default class SuperLink extends React.PureComponent {
	static defaultProps = {
		active: false,
		tabIndex: -1,
		focusable: true
	}

	onFocus = (e)=>{
		try{e.currentTarget.parentElement.setAttribute('data-is-focus','true');}catch(e){}
	}

	onBlur = (e)=>{
		try{e.currentTarget.parentElement.removeAttribute('data-is-focus');}catch(e){}
	}

	onMouseDown = (e)=>{
		if (this.props.focusable !== false)
			e.currentTarget.focus()
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
		const { className, active, tabIndex, focusable, ...other } = this.props
		const Component = other.to ? Link : 'a'

		return (
			<Component
				{...other}
				className={className+' '+s.superLink}
				tabIndex={active ? tabIndex : '-1'}
				data-tab-index={focusable ? tabIndex : undefined}
				onMouseDown={focusable ? this.onMouseDown : null}
				onFocus={focusable ? this.onFocus : null}
				onBlur={focusable ? this.onBlur : null}
				onKeyDown={focusable ? this.onKeyDown : null} />
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