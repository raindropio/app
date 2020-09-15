import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

function ExtensionNotFound({ browser_extension_mode, match: { path } }) {
    switch(browser_extension_mode) {
        case 'clipper':
            return <Redirect to={`${path}/clipper`} />

        default:
            return <Redirect to='/my' />
    }
}

export default connect(
    ({ config: { browser_extension_mode } })=>({
        browser_extension_mode
    })
)(ExtensionNotFound)