import React from 'react'
import keyvalStore from '../../stores/keyval'

export default class ThemeColor extends React.Component {
	displayName: "collections/themeColor"

	prepareCollectionColor(e,_this) {
		if (typeof this.props.collection._id == 'undefined')
			return false;
	}

	themeColor(c) {
		if ((keyvalStore.onGet('theme')||"").includes('themeDark'))
			return {__html: ""};
		return {__html:this.props.cssBlock(c)}
	}

	render() {
		return (
			<div>
				<style dangerouslySetInnerHTML={this.themeColor(this.props.collection.color)}/>
			</div>
		);
	}
}