import React from 'react'
import t from '~t'
import { Workbox } from 'workbox-window'
import { Confirm } from '~co/overlay/dialog'

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
        this.wb = new Workbox('/sw.js')
        this.wb.addEventListener('waiting', this.onUpdate)
        this.wb.register()
    }

    onUpdate = ()=>{
        Confirm('New update is available', { ok: t.s('refreshPage') })
            .then(yes=>{
                if (!yes) return

                this.wb.addEventListener('controlling', () => {
                    window.location.reload()
                })

                this.wb.messageSW({ type: 'SKIP_WAITING' })
            })
    }

    render() {
        return this.props.children
    }
}