import React from 'react'

export default class SuperOverflow extends React.Component {
	displayName = "common/superOverflow"

	isMountedNow = false
	scrollAfterTimeout = null

	constructor(props) {
		super(props);

		this.state = {
			scrolling: false
		}
	}

	componentDidMount() {
		this.isMountedNow = true;
	}

	componentWillUnmount() {
		this.isMountedNow = false;
	}

	bindRef = (r)=>{
		if (!r) return
		
		if (this.props['data-initialScrollTop'])
			r.scrollTop = this.props['data-initialScrollTop']
	}

	afterScroll() {
		if (this.isMountedNow)
			this.setState({scrolling:false});
	}

	onWheel() {
		clearTimeout(this.scrollAfterTimeout);
		this.scrollAfterTimeout = setTimeout(()=>{
			this.afterScroll();
		},1000);

		if (!this.state.scrolling)
			if (this.isMountedNow)
				this.setState({scrolling:true});
	}

	render() {
		return <div {...this.props}
					ref={this.bindRef}
					data-super-overflow="true">{this.props.children}</div>;
					
		return <div {...this.props}
					data-super-overflow="true"
					data-scrolling={this.state.scrolling}
					onWheel={this.onWheel.bind(this)}>{this.props.children}</div>;
	}
}