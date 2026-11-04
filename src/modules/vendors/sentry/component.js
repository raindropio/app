import React from 'react'
import * as Sentry from '@sentry/react'
import config from '~config'
import pkg from '../../../../package.json'
import { target } from '~target'

Sentry.init({
    ...config.vendors.sentry,
    release: process.env.SENTRY_RELEASE,
    ignoreErrors: [
        'ResizeObserver loop',
        'Non-Error promise rejection captured with keys: message', //happen when extension background page crash
        'Non-Error promise rejection captured with keys: code, message', //web3 wallet extensions: "The provider is disconnected from all chains"
        'The string did not match the expected pattern', //weird safari error
        'call screen.orientation.lock', //weird android chrome error
        'Actions may not have an undefined "type" property. Have you misspelled a constant?', //if redux action have undefined field in it, can be safely ignored
        /unsafe-eval/, //CSP violations by other extensions, wording differs per browser
        /Cannot read propert(y|ies) .*Sortable/, //https://sentry.io/organizations/oblako-corp/issues/2170103500
        'Failed to fetch', //chrome network failure
        'NetworkError when attempting to fetch resource.', //firefox network failure
        'Load failed', //safari network failure
        'buildCollectionTree', //third-party userscript
        '__firefox__', //firefox ios injected scripts
    ],
    //scripts of other extensions injected into the page
    ...(target == 'web' ? {
        denyUrls: [
            /^webkit-masked-url:/,
            /^(chrome|moz|safari-web)-extension:/
        ]
    } : {}),
    environment: `${target}-${process.env.NODE_ENV}`
})
Sentry.setTag('version', pkg.version)

export default class MySentry extends React.Component {
    render() {
        return (
            <Sentry.ErrorBoundary showDialog>
                {this.props.children}
            </Sentry.ErrorBoundary>
        )
    }
}