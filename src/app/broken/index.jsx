import React from 'react'

import MainWrap from '../../co/columns/mainWrap'
import Hello from './hello'
import Empty from './empty'
import Buy from './buy'

import statsStore from '../../stores/stats'

class Main extends React.Component {
	displayName: "app/broken"

	onStatChange() {
		this.setState({});
	}

	componentDidMount() {
		this.unsubscribeStat = statsStore.listen(this.onStatChange.bind(this));
	}

	componentWillUnmount() {
    	this.unsubscribeStat();
    }

	render() {
		const count = statsStore.getBrokenCount();

		if (!UserStore.isPro())
			return <Buy {...this.props} />

		if (count==0)
			return <Empty {...this.props} />

		return <Hello {...this.props} count={statsStore.getBrokenCount()} />
	}
}

export default MainWrap(Main)