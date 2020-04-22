import React from 'react'
import ReactDom from 'react-dom'

var _ = {
	isEqual: require('lodash/isEqual')
}

export default class AnyImg extends React.Component {
	displayName: "common/AnyImg"

	constructor(props) {
		super(props);

		this.state = {
			step: 0
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({step: 0});

		var next = JSON.parse(JSON.stringify(nextProps.urls||[])),
			prev = JSON.parse(JSON.stringify(this.props.urls||[]));

		if (!_.isEqual(next.sort(), prev.sort()))
			ReactDom.findDOMNode(this.refs.img).src = "";
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