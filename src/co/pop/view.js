import React from 'react'
import t from '~t'
import Icon from '~icon'
import SuperImg from '../common/superImg'
import Slider from '../common/slider'
import Preloader from '../common/preloader'

import collectionsStore from '../../stores/collections'
import collectionsActions from '../../actions/collections'
import keyvalStore from '../../stores/keyval'
import keyvalActions from '../../actions/keyval'

const disableCoverName = "mode-disable-cover",
	  disableDescriptionName = "mode-disable-description",
	  disableTitleName = "mode-disable-title"

export default class ViewPop extends React.Component {
	displayName = "pop/view"

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			collection: collectionsStore.getCollection(parseInt(props.id))||{},
			forceView: keyvalStore.onGet('force-view'),
			disableCover: keyvalStore.onGet(disableCoverName),
			disableDescription: keyvalStore.onGet(disableDescriptionName),
			disableTitle: keyvalStore.onGet(disableTitleName)
		}
	}

	onCollectionsChange() {
		this.setState({collection: collectionsStore.getCollection(parseInt(this.props.id))||{}});
	}

	componentDidMount() {
        this.unsubscribeCollections = collectionsStore.listen(this.onCollectionsChange.bind(this));
    }

    componentWillUnmount() {
        this.unsubscribeCollections();
    }

	setView(view,_this) {
		_this.state.collection.view = view;
		_this.setForceView(_this.state.forceView,_this);

		_this.setState({loading: true});
		collectionsActions.updateCollection({
            item: {_id: parseInt(_this.props.id), view: view},
            silent: true
        }, ()=>{
        	_this.setState({loading: false});
        });
	}

	sizeChange(val) {
		keyvalActions.set('grid-size', parseInt(val), true);
	}

	listCoverSizeChange(val) {
		keyvalActions.set('list-cover-size', parseInt(val), true);
	}

	setForceView(val) {
		if (!val) {
			keyvalActions.remove('force-view', true);
			this.setState({forceView:false})
		}
		else{
			keyvalActions.set('force-view', this.state.collection.view, true);
			this.setState({forceView: this.state.collection.view});
		}
	}

	toggleCover() {
		if (this.state.disableCover) {
			keyvalActions.remove(disableCoverName, true);
			this.setState({disableCover: false});
		}else {
			keyvalActions.set(disableCoverName, true, true);
			this.setState({disableCover: true});
		}
	}

	toggleDescription() {
		if (this.state.disableDescription) {
			keyvalActions.remove(disableDescriptionName, true);
			this.setState({disableDescription: false});
		}else {
			keyvalActions.set(disableDescriptionName, true, true);
			this.setState({disableDescription: true});
		}
	}

	toggleTitle() {
		if (this.state.disableTitle) {
			keyvalActions.remove(disableTitleName, true);
			this.setState({disableTitle: false});
		}else {
			keyvalActions.set(disableTitleName, true, true);
			this.setState({disableTitle: true});
		}
	}

	renderOptional() {
		var view = this.state.forceView||this.state.collection.view;

		switch(view){
			case "grid":
			case "masonry":
				return (
					<div className="superForm">
						<figure className="fieldWrap no-border">
							<label className="fieldName" style={{paddingTop:"12px"}}>{t.s("show")}</label>
						</figure>

						<div className="fieldLink fieldColumns" onClick={this.toggleTitle.bind(this)}>
							<span className={"extra-checkbox "+(!this.state.disableTitle?"active":"")} />

							<span>
								{t.s("title")+" "+t.s("und")+" "+t.s('tags').toLowerCase()}
							</span>
						</div>

						<figure className="fieldWrap no-border">
							<label className="fieldName" style={{paddingTop:"12px"}}>{t.s("cover")}</label>
						</figure>

						<div className="fieldLink hide-on-small-body">
							<Slider min="1" max="5" value={keyvalStore.onGet('grid-size')||2} leftIcon="size_small" rightIcon="size_big" onChange={this.sizeChange.bind(this)} />
						</div>
					</div>
				);
			break;

			case "list":
			case "simple":
				return (
					<div className="superForm">
						<figure className="fieldWrap no-border">
							<label className="fieldName" style={{paddingTop:"12px"}}>{t.s("show")}</label>
						</figure>

						<div className="fieldLink fieldColumns" onClick={this.toggleCover.bind(this)}>
							<span className={"extra-checkbox "+(!this.state.disableCover?"active":"")} />

							<span>
								{t.s(view == "list" ? "cover" : "icon")}
							</span>
						</div>
						<div className={"fieldLink "+(this.state.disableCover ? "hidden":"")}>
							<Slider min="0" max="4" value={keyvalStore.onGet('list-cover-size')||0} leftIcon="size_small" rightIcon="size_big" onChange={this.listCoverSizeChange.bind(this)} />
						</div>

						<div className={"fieldLink fieldColumns "+(view=="simple" ? "hidden" : "")} onClick={this.toggleDescription.bind(this)}>
							<span className={"extra-checkbox "+(!this.state.disableDescription?"active":"")} />

							<span>
								{t.s("description")}
							</span>
						</div>
					</div>
				);
			break;

			default:
				return null;
			break;
		}
	}

	componentDidUpdate() {
        this.props.onUpdate();
    }

	render() {
		var view = this.state.forceView||this.state.collection.view;

		return (
			<div className="popBodyView">
				<div className="superForm">
					{/*<figure className="fieldWrap no-border">
						<label className="fieldName">{t.s("view")}</label>
					</figure>*/}

					<div className="contextMenuList size-medium selectable">
						<a className={"contextMenuItem "+(view=="list"?"active":"")} onClick={(e)=>this.setView("list",this)}>
							<Icon name="view_list" />
							<span className="title">{t.s("view_list")}</span>
						</a>

						<a className={"contextMenuItem "+(view=="simple"?"active":"")} onClick={(e)=>this.setView("simple",this)}>
							<Icon name="view_simple" />
							<span className="title">{t.s("view_simple")}</span>
						</a>

						<a className={"contextMenuItem "+(view=="grid"?"active":"")} onClick={(e)=>this.setView("grid",this)}>
							<Icon name="view_grid" />
							<span className="title">{t.s("view_grid")}</span>
						</a>

						<a className={"contextMenuItem "+(view=="masonry"?"active":"")} onClick={(e)=>this.setView("masonry",this)}>
							<Icon name="view_gallery" />
							<span className="title">{t.s("view_masonry")}</span>
						</a>
					</div>
				</div>

				{this.renderOptional()}

				<div className="superForm">
					<figure className="fieldWrap no-border">
						<label className="fieldName">{t.s("optional")}</label>
					</figure>

					<div className="fieldLink fieldColumns" onClick={this.setForceView.bind(this, !this.state.forceView)}>
						<span className={"extra-checkbox "+(this.state.forceView?"active":"")} />

						<span>
							{t.s("applyToAll")}
						</span>
					</div>
				</div>

				{this.state.loading ? <div className="popOverlayLoading"><Preloader /></div> : null}
			</div>
		);
	}
}