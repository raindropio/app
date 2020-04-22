import React from 'react'
import t from 't'

import Icon from 'icon'
import CollectionEdit from '../../co/collections/edit'
import SuperOverflow from '../../co/common/superOverflow'
import URLPop from '../../co/pop/url'

import keyvalStore from '../../stores/keyval'
import collectionsStore from '../../stores/collections'

export default class Panel extends React.Component {
	displayName: "sidebar/panel"

	timeout: null

	constructor(props) {
		super(props);

		this.state = {
			page: (keyvalStore.onGet('mode-panel')||{}).page||false,
			cid: (keyvalStore.onGet('mode-panel')||{}).cid||false,
			focus: (keyvalStore.onGet('mode-panel')||{}).focus||false
		};
	}

	onKeyvalChange() {
		clearTimeout(this.timeout);

		var params = keyvalStore.onGet('mode-panel')||{};

		if (Object.keys(params).length==0){
			this.timeout = setTimeout(()=>this.setState({cid: false,page:""}),200);
			return;
		}

		if (this.state.page != params.page)
			this.setState({page: params.page});

		if (this.state.cid != params.cid){
			if (params.cid>0)
				this.setState({cid: params.cid, focus: (keyvalStore.onGet('mode-panel')||{}).focus||false});
		}
	}

	componentDidMount() {
		this.unsubscribeKeyval = keyvalStore.listen(this.onKeyvalChange.bind(this));

		this.onKey = this.onKey.bind(this);
		
		if (typeof document !== 'undefined')
        	document.addEventListener('keydown', this.onKey);
    }

    componentWillUnmount() {
    	this.unsubscribeKeyval();

    	if (typeof document !== 'undefined')
    		document.removeEventListener('keydown', this.onKey);
    }

    onKey(e) {
		switch(e.keyCode){
            case 27: //esc
            	if (keyvalStore.onGet('mode-panel')){
            		e.preventDefault();
            		e.stopPropagation();
            		this.closePanel();
            	}
            break;
		}
	}

    closePanel() {
    	keyvalStore.onRemove('mode-panel');
    }

	render() {
		var content;
		switch(this.state.page){
			case "collection":
				if (this.state.cid)
					content = <CollectionEdit id={this.state.cid} autoFocus={this.state.focus} handleClose={this.closePanel} />;
			break;

			case "url":
				content = <URLPop handleClose={this.closePanel} />;
			break;
		}

		return (
			<aside id="panel">
				<header>
					<div className="headerWrap">
						<a tabIndex="-1" onClick={this.closePanel} className="button" title={t.s("cancel")}>
							<Icon className="show-on-extension" name="back" />
							<Icon className="hide-on-extension" name="close" />
						</a>
					</div>
				</header>

				<SuperOverflow id="panelContent">
					{content}
				</SuperOverflow>
			</aside>
		);
	}
}