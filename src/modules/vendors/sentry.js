import React from 'react'
import * as Sentry from '@sentry/react'
import config from '~config'
import pkg from '~package.json'

if (process.env.NODE_ENV !== 'development') {
    Sentry.init({
        ...config.vendors.sentry,
        environment: `${process.env.APP_TARGET}-${process.env.NODE_ENV}`
    })
    Sentry.setTag('version', pkg.version)
}

export default class MySentry extends React.Component {
    render() {
        return (
            <Sentry.ErrorBoundary showDialog>
                {this.props.children}
            </Sentry.ErrorBoundary>
        )
    }
}