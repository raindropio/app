import React from 'react'
import t from '~t'

import Icon from '~icon'
import Group from '../../co/collections/group'
import CollectionItem from '../../co/collections/item'

import keyvalStore from '../../stores/keyval'
import collectionsStore from '../../stores/collections'
import statsStore from '../../stores/stats'
import _ from 'lodash'

export default class Tools extends React.Component {
	displayName = "app/sidebar/tools"

	constructor(props) {
		super(props);
		this.state = {
			hide: keyvalStore.onGet('hide-tools')||false
		}
	}

	onKeyvalChange() {
		var hide = keyvalStore.onGet('hide-tools')||false;
		if (this.state.hide != hide)
			this.setState({hide: hide});
	}

	onCollectionsChange(items) {
		this.setState({hide: this.state.hide})
	}

	componentDidMount() {
		this.unsubscribeCollections = collectionsStore.listen(this.onCollectionsChange.bind(this));
		this.unsubscribeKeyval = keyvalStore.listen(this.onKeyvalChange.bind(this));
	}

    componentWillUnmount() {
        this.unsubscribeCollections();
        this.unsubscribeKeyval();
    }

    handleToggle() {
    	keyvalStore.onToggle('hide-tools', true);
    }

    isActive(id) {
		if (typeof window == "undefined") return false;
		return (window.location.hash.indexOf(id)!=-1);
	}

	renderItem(name,title, icon, count=0) {
		var isActive = this.isActive(name);
		var link = "#/app/"+name, target = "";

		if (name.indexOf('http')==0){
			link = name;
			target = "_blank";
		}
		return <CollectionItem key={name} active={isActive} item={{title: title, icon: (icon||name)+(isActive?"_active":""), link: link, target: target, count: count}} />;
	}

	render() {
		var items = [];
		if (!this.state.hide){
			items = [
				this.renderItem('duplicates', t.s("duplicates"), "duplicates", statsStore.getDuplicatesCount()),
				this.renderItem('libroken', `${t.s("broken")} ${t.s('links').toLowerCase()}`, "broken", statsStore.getBrokenCount()),
				this.renderItem('tags', t.s("tags"), "tag", statsStore.getTagsCount())
			]

			if (collectionsStore.getCollection(-99))
				items.push(<CollectionItem key="trash" active={this.isActive("/collection/-99")} item={collectionsStore.getCollection(-99)} />)
		}

		return (
			<section>
				<Group
					index={9999}
					item={{title: _.capitalize(t.s("maintenance")), hidden: this.state.hide}}
					onToggleGroup={this.handleToggle.bind(this)} />

				{items}
			</section>
		);
	}
}