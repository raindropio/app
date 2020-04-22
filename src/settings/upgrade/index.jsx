import React from 'react'
import t from 't'
import settingsHelpers from '../parts/helpers'
import MainWrap from '../../co/columns/mainWrap'
import UserStore from '../../stores/user'

import Loading from './loading'
import Free from './free'
import Paid from './paid'

class Upgrade extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		}
	}

	componentDidMount() {
		UserStore.onLoad((result)=>{
			this.setState({loading: false});
		});
    }
    
    renderBody = ()=>{
        if (this.state.loading)
            return <Loading />

        if (UserStore.isPro())
            return <Paid />

        return <Free />
    }

	render() {
		return (
			<section id='main' className='proPage'>
				<header className='no-border'>
					<div className='headerWrap'>
                        {settingsHelpers.backButton.bind(this,true)()}
                        <h1 style={{padding:'12px 0'}}>
                            {t.s('upgradeAccount')}
                        </h1>
                    </div>
				</header>

				<div id='mainBody'>
					{this.renderBody()}
				</div>
			</section>
		)
	}
}

export default MainWrap(Upgrade)