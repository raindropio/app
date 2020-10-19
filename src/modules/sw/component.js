import React from 'react'
import { target } from '~target'

let registered = false

export default class ServiceWorkerComponent extends React.Component {
    async componentDidMount() {
        if (process.env.NODE_ENV=='production' &&
            target=='web' &&
            'serviceWorker' in navigator &&
            !registered){
            try{
                await navigator.serviceWorker.register('/sw.js')
                registered = true 
            } catch(e) {
                console.log('Service worker registration failed:', e)
            }
        }
    }

    render() {
        return this.props.children
    }
}