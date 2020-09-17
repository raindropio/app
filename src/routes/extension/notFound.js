import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { environment } from '~target'

function ExtensionNotFound({ browser_extension_mode, match: { path } }) {
    if (environment.includes('browser_action'))
        switch(browser_extension_mode) {
            case 'clipper':
                return <Redirect to={`${path}/clipper`} />

            case 'mini_app':
                return <Redirect to='/my' />

            default:
                return <Redirect to={`${path}/welcome`} />
        }

    return <Redirect to='/my' />
}

export default connect(
    ({ config: { browser_extension_mode } })=>({
        browser_extension_mode
    })
)(ExtensionNotFound)