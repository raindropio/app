import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { environment } from '~target'

import Protected from '~co/screen/protected'

function ExtensionNotFound({ browser_extension_mode, match: { path } }) {
    let content
    
    if (environment.includes('browser_action'))
        switch(browser_extension_mode) {
            case 'clipper':
                content = <Redirect to={`${path}/clipper`} />
                break
        }

    //default
    if (!content)
        content = <Redirect to='/my' />

    return (
        <Protected>
            {content}
        </Protected>
    )
}

export default connect(
    ({ config: { browser_extension_mode } })=>({
        browser_extension_mode
    })
)(ExtensionNotFound)