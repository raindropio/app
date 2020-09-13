import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Protected from '~co/screen/protected'

const NotFound = ({ last_collection, location: { hash } })=>{
	//redirect hash routes on web to actual routes
	if (process.env.APP_TARGET == 'web' &&
		hash.startsWith('#/'))
		return <Redirect to={hash.replace(/^#/, '')} />

	return (
		<Protected>
			<Redirect to={`/my/${parseInt(last_collection)||'0'}`} />
		</Protected>
	)
}

export default connect(
	({ config }) => ({
		last_collection: config.last_collection
	})
)(NotFound)