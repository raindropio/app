import React from 'react'
import { target } from '~target'

export default class ServiceWorkerComponent extends React.Component {
    componentDidMount() {
        if (process.env.NODE_ENV=='production' &&
            target=='web' &&
            'serviceWorker' in navigator)
            window.addEventListener('load', this.init)
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.init)
    }

    init = ()=>{
        navigator.serviceWorker
            .register('/sw.js')
            .catch(e=>
                console.log('Service worker registration failed:', e)
            )
    }

    render() {
        return this.props.children
    }
}