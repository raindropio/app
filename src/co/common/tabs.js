import React from 'react'
import Icon from 'icon'

export default class Tabs extends React.Component {
	displayName = "common/tabs"

	render() {
		var items = (this.props.items||[]).map((item)=>{
			if (typeof item.hidden != "undefined")
				if (item.hidden)
					return null;

			var isActive = (item.key == this.props.active);

			var title = <span className={item.icon ? "hide-on-small-body" : ""}>{item.title}</span>,
				icon;

			if (item.icon)
				icon = <Icon name={isActive ? item.icon+"_active" : item.icon} className="show-on-small-body" />;

			return (<a key={item.key} tabIndex="-1" onClick={(e)=>this.props.onChange(item.key)} className={"item"+(isActive ? " active" : "")} title={icon ? '' :item.title}>
				{isActive ? <b>{title}{icon}</b> : null}
				{!isActive ? title : null}
				{!isActive ? icon : null}
			</a>)
		})||[];

		return (
			<div className={"tabs "+(this.props.className||"")}>
				{items}
			</div>
		);
	}
}