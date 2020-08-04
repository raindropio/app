import * as Sentry from '@sentry/react'
import config from '~config'
import pkg from '~package.json'

class MySentry {
    constructor() {
        if (process.env.NODE_ENV === 'development') return
            
        Sentry.init({
            ...config.vendors.sentry,
            environment: `${process.env.__TARGET__}-${process.env.NODE_ENV}`
        })
        Sentry.setTag('version', pkg.version)

        this.isEnabled = true
    }
}

export default new MySentry()