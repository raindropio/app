import React from 'react'
import t from 't'
import Api from 'api'
import debounce from 'lodash/debounce'
import collectionsHelpers from '../../../helpers/collections'

import collectionsStore from '../../../stores/collections'
import collectionsActions from '../../../actions/collections'
import Pop from '../../../actions/pop'
import UserStore from '../../../stores/user'

import CollectionIcon from '../icon'
import Icon from 'icon'
import SuperInput from '../../common/superInput'
//import FormParent from '../../form/parent'

export default class Edit extends React.Component {
	displayName = "collections/edit/info"

	constructor(props) {
		super(props);

		this.state = {
			item: this.props.item
		}

		this.handleSave = debounce(this.handleSave, 250).bind(this)
	}

	loadCollaborators(item) {
		Api.get("collection/"+item._id+"/collaborators", (json)=>{
            if (json.items){
                var members = 0, viewers = 0;
                for(var i in json.items)
                    if (json.items[i].role=="member") members++;
                    else if ((json.items[i].role=="owner")&&(item.public)) members++;
                    else if (json.items[i].role=="viewer") viewers++;

                this.setState({collaborators: parseInt(members+viewers)});
            }
        });
	}

	componentDidMount() {
		this.loadCollaborators(this.props.item);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.item != nextProps.item){
			this.loadCollaborators(nextProps.item);
			this.setState({item:nextProps.item, showPath: false, collaborators: 0})
		}
    }

    onTitleChange(e) {
    	this.state.item.title = e.target.value;
    	this.setState({item: this.state.item}, ()=>{
			this.handleSave(['title'])
		})
	}
	
	handleSave(fields, callback) {
		const payload = {}
		fields.forEach(f=>{
			payload[f]=this.state.item[f]
		})

		collectionsActions.updateCollection({silent: true, item: {
			_id: this.state.item._id,
    		...payload
    	}}, callback)
	}

    handleRemove() {
        collectionsHelpers.remove(this.state.item);
    }

    handleChangeCollection(collection) {
        if (UserStore.isPro()){
          this.state.item.parentId = parseInt(collection._id);
          this.state.item.parent = {"$id": this.state.item.parentId};
          delete this.state.item.group;
        }

        this.setState({item: this.state.item});
        this.updateParent();
    }

    handleChangeGroup(group, index) {
        this.state.item.group = parseInt(index);
        delete this.state.item.parent;
        delete this.state.item.parentId;

        this.setState({item: this.state.item});
        this.updateParent();
    }

    handleCollectionPathVisibility(visible) {
    	this.setState({showPath: visible});
    }

    updateParent() {
    	collectionsActions.updateCollection({silent: true, item: {
    		_id: this.state.item._id,
    		parentId: this.state.item.parentId,
            group: this.state.item.group
    	}}, function() {

    	});

    	this.handleCollectionPathVisibility(false);
	}
	
	handleCoverChange = (type, value, callback)=>{
		switch(type) {
			case 'link':
				this.state.item.cover = [value]
				this.handleSave(['cover'], callback)
				this.setState({item: this.state.item})
			break

			case 'file':
				collectionsActions.uploadCover({
					_id: this.state.item._id,
					file: value
				}, callback)
			break
		}
	}

    openIconPop() {
    	Pop.show('newCover', {
			pin: "collectionIconLink", 
			force:"horizontal",
			onSelect: this.handleCoverChange
		})
    }

	render() {
		var parent = {type:"",_id:null};

        if (typeof this.props.item.parentId == 'number') {
        	parent = {type:"collection",_id: this.props.item.parentId}
        }else if (typeof this.props.item.group == 'number') {
        	parent = {type:"group",_id: this.props.item.group}
        }

		return (
			<div className="superForm superHeight editCollection">
				<div className="iconWrap" onClick={this.openIconPop.bind(this)}>
					<CollectionIcon className="icon" src={(this.props.item.cover||[])[0]} _id={this.props.item._id} active={true} />
				</div>

				<form onSubmit={(e)=>{e.preventDefault();this.props.handleClose()}}>
				<figure className="fieldWrap">
					<label className="fieldName" htmlFor="collectionTitle">{t.s("title")}</label>
					<SuperInput type="text"
							id="collectionTitle"
							className="field title"
							required={true}
							autoComplete="off"
                            selectAll={this.props.item.title==t.s("untitled")?true:false}
							defaultValue={this.props.item.title}
							onChange={this.onTitleChange.bind(this)}
							autoFocus={this.props.autoFocus} />
				</figure>
				</form>

				{/*<figure className={"fieldWrap " + (this.state.showPath ? "fieldSpace" : "")}>
					<label className="fieldName" htmlFor="collectionParent">{t.s("parent")}</label>

					<FormParent {...parent} 
						name="collections"
						visible={this.state.showPath}
						skipCollection={this.props.item._id}
						handleChangeCollection={this.handleChangeCollection.bind(this)}
						handleChangeGroup={this.handleChangeGroup.bind(this)}
						onChangeVisibility={this.handleCollectionPathVisibility.bind(this)} />
				</figure>*/}

				<div className={"fieldsGroup " + (this.state.showPath ? "hidden" : "")}>
					<section className="fieldLink">
						<a className="button active" id="collectionIconLink" onClick={this.openIconPop.bind(this)}>{t.s("changeIcon")}</a>
					</section>

					<section className="fieldLink">
						<a className="button active" id="collectionSharingLink" onClick={()=>Pop.show('sharing',{pin: "collectionSharingLink", collection:this.props.item, force:"horizontal"})}>
                            <span className="button-icon">
                                {this.props.item.public && <Icon name="status_public" />}
                                {this.props.item.collaborators?<span>&nbsp; &nbsp; <Icon name="status_collaborators" /></span>:null}
                                {this.props.item.collaborators?<span>{this.state.collaborators}</span>:null}
                            </span>
                            {t.s("sharing")}
                        </a>
					</section>

					<section className="fieldLink">
						<a className="button active" id="collectionRSSLink" onClick={()=>Pop.show('rss',{pin: "collectionRSSLink", _id:this.props.item._id, force:"horizontal"})}>RSS</a>
					</section>

                    <section className="fieldLink">
                        <a className="button active" onClick={()=>collectionsHelpers.createBlank({parentId: parseInt(this.props.item._id)})}><span className="button-icon"><Icon name="new_collection" /></span>{t.s("createSubFolder")}</a>
                    </section>

					<div className="space" />

					<section className="fieldLink">
						<a className="button active" onClick={this.handleRemove.bind(this)}>{t.s("removeCollectionForever")}</a>
					</section>

                    <figure className="fieldWrap no-border">
                        <label className="fieldName"><b>{t.s("advice")}</b></label>

                        <label className="fieldName" style={{paddingTop:"10px"}}>{t.s("dragCollections")}</label>
                        <label className="fieldName" style={{paddingTop:"10px"}}>{t.s("helpContextD")}</label>
                    </figure>
                    <br />
				</div>
			</div>
		);//{!this.props.item.public ? <span className="button-icon"><Icon name="lock" /></span> : null}{t.s((this.props.item.public ? "public" : "privateD"))}{this.state.collaboratorsText}
	}
}