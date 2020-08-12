import React from 'react'
import t from '~t'
import UserStore from '~stores/user'

import Main, { Header, Content } from '~co/screen/splitview/main'
import Free from './free'
import Paid from './paid'

export default class Upgrade extends React.Component {
    renderBody = ()=>{
        if (UserStore.isPro())
            return <Paid />

        return <Free />
    }

	render() {
		return (
			<Main className='proPage'>
				<Header title={t.s('upgradeAccount')} />

				<Content>
					{this.renderBody()}
				</Content>
			</Main>
		)
	}
}