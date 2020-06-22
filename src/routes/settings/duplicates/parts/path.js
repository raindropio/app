import React, {PureComponent} from 'react'
import Icon from '~co/common/icon'
import CollectionIcon from '~co/collections/icon'

import collectionsStore from '~stores/collections'

export default class Path extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {}
		this.state = this.prepareState(props);
	}

	prepareState(props) {
		if (props.collection && this.state.cId == props.collection.$id)
			return this.state;

		var parents = [], ids=[props.collection && props.collection.$id];
		var allCollections = collectionsStore.getCollections();

		var findParents = function (id) {
            allCollections.forEach(function (item) {
                if (id == item._id) {
                    if (item._id != props.id)
                        parents.push({
                        	title: item.title,
                        	_id: item._id,
                        	cover: item.cover
                        });

                    if (item.parent){
	                    ids.push(item.parent.$id);
	                    findParents(item.parent.$id);
	                }
                }
            });
        }
        findParents(ids[0]);

        parents.reverse();

		return {
			cId: props.collection.$id,
			parents: parents
		}
	}

	UNSAFE_componentWillReceiveProps(props) {
		this.setState(this.prepareState(props));
	}

	renderPart(content, index) {
		return (
			<div className="di-path-part" key={index}>
				<Icon className="di-arrow" name="next" data-size="micro" />
				{content}
			</div>
		)
	}

	render() {
		const {
			title,
			excerpt,
			collection,
			link
		} = this.props;

		const collections = (this.state.parents||[]).map((item,index)=>{
			let lastPartOfLink="";
			//if (index==this.state.parents.length-1)
			//	lastPartOfLink="/"+encodeURIComponent(JSON.stringify([{key:"word",val:link}]));

			return this.renderPart((
				<a href={"#/space/"+item._id+lastPartOfLink} className="di-collection">
					<CollectionIcon _id={item._id} cover={item.cover} />
					{item.title}
				</a>
			), item._id)
		})

		return (
			<div className="di-path">
				{collections}
				{title ? this.renderPart(title) : null}
			</div>
		)
	}
}