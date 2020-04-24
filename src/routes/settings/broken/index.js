import React from 'react'
import t from '~t'

import Main, { Header, Content } from '~co/screen/splitview/main'
import Hello from './hello'
import Empty from './empty'
import Buy from './buy'

import statsStore from '~stores/stats'
import UserStore from '~stores/user'

class Broken extends React.Component {
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
		var content
		const count = statsStore.getBrokenCount();

		if (!UserStore.isPro())
			content = <Buy {...this.props} />
		else if (count==0)
			content = <Empty {...this.props} />
		else
			content = <Hello {...this.props} count={statsStore.getBrokenCount()} />

		return (
			<Main>
				<Header title={t.s('broken')+' '+t.s('links').toLowerCase()} />

				<Content>
					{content}
				</Content>
			</Main>
		)
	}
}

export default Broken