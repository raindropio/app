import s from './index.module.styl'
import React from 'react'
import ReactDom from 'react-dom'
import Icon from '~co/common/icon'

export default class Slider extends React.Component {
	displayName = 'common/Slider'

	setVal(val,_this) {
		ReactDom.findDOMNode(_this.refs.ranger).value = parseInt(val);
		_this.props.onChange(parseInt(val))
	}

	render() {
		return (
			<div className={s.slider}>
				<a onClick={(e)=>this.setVal(this.props.min||0,this)}><Icon name={this.props.leftIcon} /></a>
				<input ref='ranger' type='range' min={this.props.min||0} max={this.props.max} step='1' defaultValue={this.props.value} onChange={(e)=>this.props.onChange(parseInt(e.target.value))} />
				<a onClick={(e)=>this.setVal(this.props.max,this)}><Icon name={this.props.rightIcon} /></a>
			</div>
		);
	}
}