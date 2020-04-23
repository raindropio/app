import React from 'react'
import { Route } from 'react-router-dom'
import CollectionItem from '../co/collections/item'

export default {
	listToRoutes(list) {
		let items = [];

		list.forEach((group)=>{
			group.items.forEach((item)=>{
				items.push(<Route key={item.name} {...item} />)
			})
		})

		return items;
	},

	renderSidebar(list) {
		let items = [];

		list.forEach((group,groupIndex)=>{
			var childrens = [];
			group.items.forEach((item)=>{
				var isActive = (window.location.hash.indexOf(item.name)!=-1);
				childrens.push(<CollectionItem key={item.name} active={isActive} item={{title: item.title, icon: (item.icon||item.name)+(isActive?"_active":""), link: "#/install/"+item.name}} />)
			})

			var groupName;
			if (group.group)
				groupName = (
					<div className="group">
						<div className="title">{group.group}</div>
					</div>
				);

			items.push(
				<section key={groupIndex}>
					{groupName}
					{childrens}
				</section>
			);
		})

		return items
	}
}