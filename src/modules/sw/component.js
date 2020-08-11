import React from 'react'

export default class ServiceWorkerComponent extends React.Component {
    componentDidMount() {
        if (process.env.NODE_ENV=='production' && 
            'serviceWorker' in navigator)
            window.addEventListener('load', this.init)
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.init)
    }

    init = ()=>{
        navigator.serviceWorker.register('/sw.js')
    }

    render() {
        return this.props.children
    }
}