import React from 'react'
import t from 't'

import Icon from 'icon'
import Slider from '../common/slider'

export default class PreviewPop extends React.Component {
	displayName: "pop/preview"

	constructor(props) {
		super(props);
		this.state = {
			font_size: UserStore.getUser().config["font_size"] || 0,
			font_color: UserStore.getUser().config["font_color"] || "",
			font_family: UserStore.getUser().config["font_family"] || ""
		}
	}

	fontSizeChange(val) {
		val = parseInt(val);
		UserStore.onUpdateConfig({font_size: val});
		this.setState({font_size: val});
	}

	fontColorChange(val,_this) {
		UserStore.onUpdateConfig({font_color: val});
		_this.setState({font_color: val});
	}

	fontChange(val,_this) {
		UserStore.onUpdateConfig({font_family: val});
		_this.setState({font_family: val});
	}

	componentDidUpdate() {
        this.props.onUpdate();
    }

	render() {
		return (
			<div className="popBodyPreview">
				<div className="popBodyPreviewSwitch pop-block-shadow">
					<a className={"white "+(this.state.font_color==""?"active":"")} onClick={(e) => this.fontColorChange("",this)}></a>
					<a className={"sunset "+(this.state.font_color=="sunset"?"active":"")} onClick={(e) => this.fontColorChange("sunset",this)}></a>
					<a className={"dark "+(this.state.font_color=="night"?"active":"")} onClick={(e) => this.fontColorChange("night",this)}></a>
				</div>

				<div className="popBodyPreviewFont pop-block-shadow">
					<a className={"default "+(this.state.font_family==""?"active":"")} onClick={(e) => this.fontChange("",this)}>Segoe UI</a>
					<a className={"georgia "+(this.state.font_family=="georgia"?"active":"")} onClick={(e) => this.fontChange("georgia",this)}>Georgia</a>
					<a className={"verdana "+(this.state.font_family=="verdana"?"active":"")} onClick={(e) => this.fontChange("verdana",this)}>Verdana</a>
				</div>
				
				<div className="pop-block-shadow">
					<Slider min="1" max="9" value={this.state.font_size} leftIcon="font_small" rightIcon="font_big" onChange={this.fontSizeChange.bind(this)} />
				</div>
			</div>
		);
	}
}