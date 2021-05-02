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
            'ResizeObserver loop',
            'Non-Error promise rejection captured with keys: message', //happen when extension background page crash
            'The string did not match the expected pattern', //weird safari error
            'call screen.orientation.lock', //weird android chrome error
            'Actions may not have an undefined "type" property. Have you misspelled a constant?', //if redux action have undefined field in it, can be safely ignored
            'Refused to evaluate a string as JavaScript because \'unsafe-eval\'',
            'Cannot read property \'Sortable', //https://sentry.io/organizations/oblako-corp/issues/2170103500 
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