import React from 'react'
import ReactDom from 'react-dom'
import t from 't'

import collectionsStore from '../../stores/collections'

import CollectionIcon from '../collections/icon'
import Icon from 'icon'
import CollectionsList from '../collections'

export default class Parent extends React.Component {
	displayName: "form/parent"
	timeout: null

	constructor(props) {
		super(props);

		this.state = this.prepareState(props);
	}

	prepareState(props) {
		var state = {
			alreadyClicked: false,
			isGroup: false,
			title: ""
		};

		switch(props.type){
			case "collection":
				var parent = Object.assign({}, collectionsStore.getCollection(props._id));

				state._id = parent._id;
				state.title = parent.title;
            	state.cover = <CollectionIcon className="fieldIcon" src={(parent.cover||[])[0]} _id={props._id} />;
			break;

			case "group":
				try{
					state.isGroup = true;
					state._id = UserStore.getUser().groups[props._id].id;
					state.title = UserStore.getUser().groups[props._id].title;
				}catch(e){}
				state.cover = <Icon name="group" className="fieldIcon" />;
			break;
		}

		return state;
	}

	onChange(e) {
    	this.setState({title: e.target.value, alreadyClicked: true});
	}

	onFocus(e) {
		clearTimeout(this.timeout)
		if (!this.state.alreadyClicked)
			e.target.setSelectionRange && e.target.setSelectionRange(0, e.target.value.length);
		this.props.onChangeVisibility(true);
	}

	onBlur(e) {
		clearTimeout(this.timeout)
		this.timeout=setTimeout(()=>this.props.onChangeVisibility(false),300);
	}

	onKeyDown(e) {
		switch(e.keyCode){
			case 40: //down
				e.preventDefault();
				//this.scrolTo('down');
			break;

			case 38: //up
				e.preventDefault();
				//this.scrolTo('top');
			break;

			case 13:
				e.preventDefault();
				ReactDom.findDOMNode(this.refs.input).blur();
				this.props.onChangeVisibility(false);
			break;
		}
	}

	scrolTo(dir) {
		var elements = document.getElementsByClassName(this.props.name+"path");
		var nodeList = Array.prototype.slice.call( elements );
		var index = nodeList.indexOf( document.querySelector("."+this.props.name+"path.active") );

		var next = index+1;
		if (dir=="top") next = index-1;

		var nextElem = elements[next];
		if (!nextElem) return false;
		nextElem = nextElem.getElementsByClassName('superLink')[0];

		nextElem.click();
	}

	componentWillReceiveProps(nextProps) {
		//if (nextProps._id != this.state._id)
		this.setState(this.prepareState(nextProps));

		setTimeout(()=>{
			var elem = document.querySelector("."+this.props.name+"path.active");
			var cont = document.querySelector(".pathWrap");
			if ((elem)&&(cont))
				cont.scrollTop = elem.offsetTop - (cont.offsetHeight / 2);
		},10);
	}

	render() {
		return (
			<div className="collectionPathWrap" data-focus={this.props.visible}>
				<label className="selectButton" data-focus={this.props.visible}>
					{this.state.cover||null}
					<input type="text"
							ref="input"
							id="collectionParent"
							autoComplete="off"
							value={this.state.title}
							onKeyDown={this.onKeyDown.bind(this)}
							onChange={this.onChange.bind(this)}
							onFocus={this.onFocus.bind(this)}
							onBlur={this.onBlur.bind(this)} />

					<Icon className="fieldIcon arrow" name="arrow" />
				</label>

				<div className="pathWrap">
	                <CollectionsList
	            		navPrefix={this.props.name+"path"}
	                    embeded={true}
	                    onlyMy={true}
	                    find={this.state.alreadyClicked?this.state.title:false}
	                    activeCollection={!this.state.isGroup ? this.state._id : null}
	                    activeGroup={this.state.isGroup ? this.state._id : null}
	                    skipCollection={this.props.skipCollection}
	            		onSelectCollection={this.props.handleChangeCollection}
	            		onSelectGroup={this.props.handleChangeGroup} />
            	</div>
			</div>
		)
	}
}