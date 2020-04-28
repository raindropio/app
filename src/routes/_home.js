import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Protected from '~co/screen/protected'

const Home = ({ last_collection })=>(
	<Protected>
		<Redirect to={`/collection/${parseInt(last_collection)||'0'}`} />
	</Protected>
)

export default connect(
	({ last_collection }) => ({
		last_collection
	})
)(Home)