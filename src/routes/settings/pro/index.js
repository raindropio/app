import React from 'react'
import { connect } from 'react-redux'
import { user } from '~data/selectors/user'

import Free from './free'
import Paid from './paid'

function SettingsPro (props) {
	const Component = props.user.pro ? Paid : Free

	return (
		<Component {...props} />
	)
}

export default connect(
    state=>({
        user: user(state)
    })
)(SettingsPro)