import React from 'react'
import { Link } from 'react-router-dom'

export default class SuperLink extends React.PureComponent {
	onFocus = (e)=>{
		try{e.target.parentElement.setAttribute('data-is-focus','true');}catch(e){}
	}

	onBlur = (e)=>{
		try{e.target.parentElement.removeAttribute('data-is-focus');}catch(e){}
	}

	onMouseDown = (e)=>{
		if (this.props.focusable !== false)
			e.target.focus()
	}

	onKeyDown = (e)=>{
		switch(e.keyCode){
			case 38: //top
				if (!this.scrollTo('top',e,this))
					e.preventDefault();
			break;

			case 40: //bottom
				if (!this.scrollTo('bottom',e,this))
                	e.preventDefault();
            break;

            default:
            	if (this.props.onKeyDown)
            		return this.props.onKeyDown(e)
            break;
		}
	}

	scrollTo = (dir, e)=>{
		if (!this.props.navPrefix) return false;

		var elements = document.querySelectorAll('.'+this.props.navPrefix+':not(.no-focus)');
		var nodeList = Array.prototype.slice.call( elements );
		var index = nodeList.indexOf( e.target.parentElement );

		var next = index+1;
		if (dir=='top') next = index-1;

		var nextElem = elements[next];
		if (!nextElem) return false;
		nextElem = nextElem.getElementsByClassName('superLink')[0];

		nextElem.focus();
		if (!this.props.onlyFocus)
			nextElem.click();
	}

	render() {
		const { className, navPrefix, ...other } = this.props
		const Component = other.to ? Link : 'a'

		return <Component
					{...other}
					href={this.props.href}
					className={className+' superLink'}
					onMouseDown={this.onMouseDown}
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					onKeyDown={this.onKeyDown} />
	}
}