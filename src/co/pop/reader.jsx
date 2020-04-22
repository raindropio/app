import React from 'react'
import t from 't'
import _ from 'lodash'

import Icon from 'icon'
import keyvalStore from '../../stores/keyval'
import keyvalActions from '../../actions/keyval'

export default class PreviewPop extends React.Component {
	displayName: "pop/preview"

	constructor(props) {
		super(props);
		this.state = this.prepareState();
	}

	prepareState() {
		return {
			fullscreen: keyvalStore.onGet("mode-reader-fullscreen")||false,
			disableReader: keyvalStore.onGet("mode-disable-reader")||false,
			includingLinks: keyvalStore.onGet("mode-reader-including-links")||false,
			newTab: keyvalStore.onGet("open-links-here")||false
		}
	}

	componentDidUpdate() {
		if (this.props.onUpdate){
	        this.props.onUpdate();
	        setTimeout(()=>this.props.onUpdate(),300);
	    }
    }

    componentDidMount() {
        this.unsubscribeKeyval = keyvalStore.listen(this.onKeyvalChange.bind(this));
    }

    componentWillUnmount() {
        this.unsubscribeKeyval();
    }

    onKeyvalChange() {
    	this.setState(this.prepareState());
    }

    fullscreenToggle() {
    	keyvalActions.toggle('mode-reader-fullscreen', true);
    }

    openLinksToggle() {
    	keyvalActions.toggle('mode-disable-reader', true);
    }

    openLinksTargetBlank() {
    	keyvalActions.toggle('open-links-here', true);
	}
	
	includingLinksToggle() {
    	keyvalActions.toggle('mode-reader-including-links', true);
    }

	render() {
		return (
			<div className="superForm">
				<figure className="fieldWrap no-border">
					<label className="fieldName">{t.s("preview")} <b>Beta</b></label>
				</figure>

				<div className="fieldLink fieldColumns" onClick={this.openLinksToggle}>
					<span className={"extra-checkbox"+(!this.state.disableReader?" active":"")} />

					<span>
						{t.s("previewBookmarks")}
					</span>
				</div>

				<div className={"fieldLink fieldColumns "+(!this.state.disableReader ? "hidden":"")} onClick={this.openLinksTargetBlank}>
					<span className={"extra-checkbox"+(!this.state.newTab?" active":"")} />

					<span>
						{t.s("openLinksInNewTab")}
					</span>
				</div>

				<div className={"fieldLink fieldColumns "+(this.state.disableReader ? "hidden":"")} onClick={this.includingLinksToggle}>
					<span className={"extra-checkbox"+(this.state.includingLinks?" active":"")} />

					<span>
						{_.capitalize(t.s("including"))} {t.s('links').toLowerCase()}
					</span>
				</div>

				{/*<div className="fieldLink fieldColumns" onClick={this.fullscreenToggle}>
					<span className={"extra-checkbox"+(this.state.fullscreen?" active":"")} />
					
					<span>
						{t.s("fullscreen")}
					</span>
				</div>*/}
			</div>
		);
	}
}