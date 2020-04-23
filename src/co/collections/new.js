import React from 'react'
import t from '~t'

import Icon from '~icon'
import SuperLink from '../common/superLink'
import SuperInput from '../common/superInput'

import collectionsActions from '~actions/collections'
import keyvalStore from '~stores/keyval'

export default class NewCollection extends React.Component {
	displayName = "NewCollection"

	constructor(props) {
		super(props);

		this.state = {
			createStep: false,
			newTitle: ""
		};

		this.onChangeInput = this.onChangeInput.bind(this)
	}

	showForm() {
		this.setState({createStep:"new"});
	}

	discardForm() {
		this.setState({createStep:false});
	}

	createCollection(e) {
		e.preventDefault();
		this.setState({createStep:"loading"});

		collectionsActions.insertCollection({
            item: {
            	title: this.state.newTitle,
            	group: this.props.group
            }
        }, (cId)=> {
        	if (cId>0){
        		this.discardForm();
        		//keyvalStore.onSet('mode-panel',{cid:cId,focus:true});

        		if (typeof this.props.onSave == "function")
        			this.props.onSave({_id: cId});
        		else
        			window.location.hash="#/collection/"+cId;
        	}
            else{
            	this.showForm()
            }
        });
	}

	onChangeInput(e) {
		this.setState({newTitle: e.target.value})
	}

	render() {
		switch(this.state.createStep){
			case "new":
				var placeholder = t.s("enterTitle")+"..."
				//collection-new-form
				return (
					<form className="collection no-focus" data-is-focus="true" onSubmit={this.createCollection.bind(this)}>
						<span className="expand"><Icon name="arrow_alt" /></span>
						<Icon name={this.props.isFirst ? "new_collection_active" : "add_active"} className="collectionIcon" />
						<SuperInput type="text"
								required={true}
								autoFocus={true}
								selectAll={true}
								value={this.state.newTitle}
								placeholder={placeholder}
								onKeyUp={(e)=>{if(e.keyCode==27)this.discardForm()}}
								onChange={this.onChangeInput}
								onBlur={this.discardForm.bind(this)} />
					</form>
				);
			break;

			case "loading":
				return (
					<article className="collection no-focus">
						<span className="expand"><Icon name="arrow_alt" /></span>
						
					</article>
				);
			break;

			default:
				var caption = t.s("createCollection")+"…";
				//if (this.props.isFirst)
				//	caption = t.s("createFirstCollection");

				return (
					<article className="collection no-focus" id="createNewCollectionLink" title={caption}>
						<span className="expand"><Icon name="arrow_alt" /></span>
						<Icon name={this.props.isFirst ? "new_collection" : "plus"} className="collectionIcon" />
						<div className="title">{caption}</div>
						<SuperLink
							onClick={this.showForm.bind(this)}
							className="permalink" />
					</article>
				);
			break;
		}
	}
}