import React from 'react'
import t from '~t'
import Icon from '~icon'
import _ from 'lodash'

import collectionsActions from '../../actions/collections'
import collectionsStore from '../../stores/collections.js'
import userActions from '../../actions/user'
import UserStore from '../../stores/user'

import Item from './item'
import Group from './group'
import ItemMoveZone from './itemMoveZone'
import Examples from './examples'

var haveChildrens = []

export default class CollectionsList extends React.Component {
	displayName = "collections/index"

	constructor(props) {
		super(props);
		this.state = {
			items: this.cleanItems(collectionsStore.getCollections()),
			user: UserStore.getUser()
		}
	}

	cleanItems(items) {
		return Object.assign([], items);
	}

	onCollectionsChange(items) {
		this.setState({items: this.cleanItems(items)})
	}

	onUserChange(user) {
        this.setState({user: user});
    }

	componentDidMount() {
		this.unsubscribeCollections = collectionsStore.listen(this.onCollectionsChange.bind(this));
		this.unsubscribeUser = UserStore.listen(this.onUserChange.bind(this));
	}

    componentWillUnmount() {
        this.unsubscribeCollections();
        this.unsubscribeUser();
	}

    onGroupClick(id) {
    	userActions.toggleGroup({id:id});
    }

    onToggleChildrens(item) {
    	collectionsActions.toggleExpanded({
			_id: item._id
		})
    }

    createNewFromExample(item) {
    	collectionsActions.insertCollection({
            item: Object.assign(item, {group: 0}),
        }, (cId)=>{
            if (cId>0)
                this.props.onSelectCollection({_id: cId});
        });
    }

    noCollectionsClick = (e)=>{
    	e.preventDefault()

    	window.location.href='#/app/startcollecting'

    	document.querySelector('#createNewCollectionLink .superLink').click()
    }

    makeItem = (item,level)=>{
    	if (item){
			var isActive = false;
			if (typeof this.props.activeCollection != "undefined")
				isActive = (this.props.activeCollection == item._id);
			else
				isActive = (collectionsStore.getCurrentId() == item._id);

			return <Item
						key={"collection"+item._id}
						navPrefix={this.props.navPrefix}
						item={item}
						level={level}
						haveChildrens={(haveChildrens.indexOf(item._id)!=-1)}
						active={isActive}
						embeded={this.props.embeded}
						onToggleChildrens={(e)=>this.onToggleChildrens(item)}
						onClick={this.props.onSelectCollection ? this.props.onSelectCollection : false} />;
		}
		return null;
    }

    makeRootItems = (group)=> {
		//if ((this.props.embeded)&&(!UserStore.isPro())) return null;

		var rootItems = [];
		var findChildrens = (parent, level)=> {
			if ((parent.expanded||false)/*||(this.props.embeded)*/)
			this.state.items.forEach((c)=>{
				if (c.parent)
                if (c.parent["$id"]==parent._id) {
                	if (c._id!=this.props.skipCollection||null){
                		var canAdd = true;
                		if (this.props.onlyMy){
							canAdd = ((c._id||0>0)&&(c.author));
						}

						if (canAdd) {
							rootItems.push(<ItemMoveZone key={"itemMoveZone"+c._id} _id={c._id} parent={c.parent} sort={c.sort} level={level} />);
		                    rootItems.push(this.makeItem(c,level));
		                    findChildrens(c, level+1);
		                }
	                }
                }
            });
		}

		if ((!group.hidden) /*|| (this.props.onSelectCollection)*/){
			(group.collections||[]).forEach((rootItem)=>{
				if (rootItem!=this.props.skipCollection||null){
					var tempC = collectionsStore.getCollection(rootItem);
					if (tempC){
						var canAdd = true;

						if (this.props.onlyMy){
							canAdd = ((tempC._id||0>0)&&(tempC.author));
						}

						if (canAdd){
							rootItems.push(<ItemMoveZone key={"itemMoveZone"+tempC._id} _id={tempC._id} parent={tempC.parent} sort={tempC.sort} level={0} />);
							rootItems.push(this.makeItem(tempC, 0));

							findChildrens(tempC, 1);
						}
					}
				}
			});

			/*if ((this.state.user.groups||[]).length==1)
				rootItems.push(<New key={"newInGroup"+group.id}
									group={group.id}
									hideCaption={this.state.user.groups.length>1}
									isFirst={(group.collections||[]).length==0}
									onSave={this.props.onSelectCollection} />);*/
		}

		if ((rootItems.length==0)&&(!group.hidden))
			rootItems.push(<article key={"noCollections"+group.id} className="collection no-focus" onClick={this.noCollectionsClick}>
				<span className="expand"><Icon name="arrow_alt" /></span>
				<Icon name="info" className="collectionIcon" />
				<div className="title">{t.s("noCollections")}</div>
			</article>)

		return rootItems;
	}

    renderInboxCollection = ()=>{
    	const c = collectionsStore.getCollection(-1);
    	/*if (!c.count)
    		return null;*/

    	return this.makeItem(c)
	}

	renderItemNothingFound = ()=>(
		<article key='nothing' className="collection no-focus">
			<span className="expand"><Icon name="arrow_alt" /></span>
			<Icon name="info" className="collectionIcon" />
			<div className="title">{t.s("nothingFound")}</div>
		</article>
	)
	
	renderGroups = ()=>{
		haveChildrens = [];
		this.state.items.forEach(function(c){
			if (c.parent)
				if (c.parent["$id"]){
					var id = parseInt(c.parent["$id"]);
					if (haveChildrens.indexOf(id)==-1)
						haveChildrens.push(id)
				}
		});


		var groups = [];

		(this.state.user.groups||[]).forEach((group,groupIndex)=>{
			var active = false;
			if (typeof this.props.activeGroup != "undefined")
				active = (this.props.activeGroup == groupIndex);

			var groupItem = <Group
							index={groupIndex}
							active={active} 
							item={group}
							embeded={this.props.embeded}
							onSelectGroup={this.props.onSelectGroup}
							onToggleGroup={this.props.onSelectGroup ? null : this.onGroupClick} />;

			groups.push(
				<section key={"group"+group.id}>
					{groupItem}
					{this.makeRootItems(group)}
					<ItemMoveZone key={"itemMoveZoneGroup"+group.id} group={group.id} level={0} />
				</section>
			);
		});

		if (this.props.embeded){
			groups.push(
				<Examples onClick={this.createNewFromExample.bind(this)} />
			);
		}

		return groups
	}

	render() {
		return (
			<div className="collections">
				<section>
					{this.props.onlyMy ? null : this.makeItem(collectionsStore.getCollection(0))}
					{(this.props.onSelectGroup) ? null : this.renderInboxCollection()}
				</section>

				{this.renderGroups()}
			</div>
		);
	}
}