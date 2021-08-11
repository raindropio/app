import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { user } from '~data/selectors/user'
import { Helmet } from 'react-helmet'
import { Header } from '~co/screen/splitview/main'
import { Title } from '~co/common/header'

import Free from './free'
import Paid from './paid'

function SettingsPro (props) {
	const Component = props.user.pro ? Paid : Free

	return (
		<>
			<Helmet><title>{t.s('subscription')}</title></Helmet>
			<Header data-fancy><Title>{t.s('subscription')}</Title></Header>

			<Component {...props} />
		</>
	)
}

export default connect(
    state=>({
        user: user(state)
    })
)(SettingsPro)