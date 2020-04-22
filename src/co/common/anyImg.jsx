import React from 'react'

export default class AnyImg extends React.Component {
	displayName = "common/AnyImg"

	constructor(props) {
		super(props);

		this.state = {
			step: 0
		}
	}

	onError(e) {
		this.setState({step: this.state.step+1});
	}

	render() {
		const { urls, ...rest } = this.props

		var src = "";
		if (urls[this.state.step])
			src = urls[this.state.step];

		if (src)
			return <img ref="img" src={src} {...rest} onError={this.onError.bind(this)} />;

		return <img ref="img" {...rest} />;
	}
}