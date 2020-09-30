import React from 'react'
import * as Sentry from '@sentry/react'
import config from '~config'
import pkg from '../../../package.json'
import { target } from '~target'

//Firefox sending errors without sourcemap, so just ignore them at all
if (process.env.NODE_ENV !== 'development' &&
    process.env.SENTRY_RELEASE) {
    Sentry.init({
        ...config.vendors.sentry,
        release: process.env.SENTRY_RELEASE,
        ignoreErrors: [
            /ResizeObserver loop.*/i
        ],
        environment: `${target}-${process.env.NODE_ENV}`
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