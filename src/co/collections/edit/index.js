import React from 'react'

import collectionsStore from '../../../stores/collections'
import PopStore from '../../../stores/pop'

import CollectionInfo from "./info"
import ThemeColor from '../themeColor'

export default class Edit extends React.Component {
	displayName = "collections/edit"

	constructor(props) {
		super(props);

		if (props.id)
			this.state = {
				item: this.getCollection(props.id),
				page: ''
			};
	}

	onPopChange(state) {
		if (!state)
		if (this.state.item)
			if (this.state.item._id){
				var c = this.getCollection(this.state.item._id);
				if (c)
					this.setState({item: c});
			}
	}

	componentDidMount() {
		this.unsubscribePop = PopStore.listen(this.onPopChange.bind(this));
	}

	componentWillUnmount() {
        this.unsubscribePop();
    }

	getCollection(id) {
		return JSON.parse(JSON.stringify(collectionsStore.getCollection(id)||{}));
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.id){
			var c = this.getCollection(nextProps.id);
    		this.setState({item: c});
		}
    }

    componentDidUpdate() {
    	if (Object.keys(this.state.item||{}).length==0)
    		this.props.handleClose();
    }

    themeCSSBlock(c) {
		if (c){
			var cleanC = "";
			try{cleanC = c.match(/rgb\((.*)\)/)[1];}catch(e) {}
			
			return `
				#panel {
					--accentColor: ${c} !important;
				}
			`
		}
		else
			return null;
        /*return `
            #collectionEditBlock .button.active, #collectionEditBlock .button:hover {color:${c} !important;}
            #collectionEditBlock .button.active b {background:${c} !important;}
            #collectionEditBlock .preloader .preloaderPath {stroke: ${c}}
            #collectionEditBlock .selectButton[data-focus="true"] {box-shadow: 0px 0px 0px 1px rgba(${cleanC},.5);background:rgba(${cleanC},.05)}
        `*/
    }

	render() {
		return (<div id="collectionEditBlock" key={this.props.id}>
			<ThemeColor collection={this.state.item} cssBlock={this.themeCSSBlock} />
			<CollectionInfo {...this.props} item={this.state.item} handleClose={this.props.handleClose} />
		</div>);
	}
}