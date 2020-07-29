import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Protected from '~co/screen/protected'

const Home = ({ last_collection, location: { hash } })=>{
	//redirect hash routes on web to actual routes
	if (__TARGET__ == 'default' &&
		hash.startsWith('#/'))
		return <Redirect to={hash.replace(/^#/, '')} />

	return (
		<Protected>
			<Redirect to={`/${parseInt(last_collection)||'0'}`} />
		</Protected>
	)
}

export default connect(
	({ config }) => ({
		last_collection: config.last_collection
	})
)(Home)