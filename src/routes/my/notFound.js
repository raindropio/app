import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

function MyRouteNotFound({ match: { path }, last_collection }) {
    return (
        <Redirect to={`${path}/${parseInt(last_collection)||'0'}`} />
    )
}

export default connect(
	({ config }) => ({
		last_collection: config.last_collection
	})
)(MyRouteNotFound)