import React from 'react'
import * as Sentry from '@sentry/react'
import config from '~config'
import pkg from '~package.json'

const isFirefox = navigator.userAgent.toLowerCase().includes('firefox')

//Firefox sending errors without sourcemap, so just ignore them at all
if (process.env.NODE_ENV !== 'development' && !isFirefox) {
    Sentry.init({
        ...config.vendors.sentry,
        ignoreErrors: [
            /ResizeObserver loop.*/i
        ],
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