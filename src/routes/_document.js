import '../css/base.styl'

import React from 'react'
import { Helmet } from 'react-helmet'
import isMobile from 'ismobilejs'
import { getCurrentBrowser, scrollbarIsObtrusive } from '~modules/strings'
import environment from '~modules/environment'
import keyvalStore from '~stores/keyval'

export default class Document extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            html: {
                className: [
                    isMobile(navigator.userAgent).phone ? 'mobile' : 'web',
                    ...getCurrentBrowser(),
                    scrollbarIsObtrusive() ? 'scrollbar-obtrusive' : '',
                    window.devicePixelRatio && devicePixelRatio >= 2 ? 'retina' : '',
                    environment.isClipper() ? 'clipper' : ''
                ].join(' ')
            },
            body: {
                className: this.getBodyClassName(keyvalStore.onAll())
            }
        }
    }

    componentDidMount() {
        environment.initElectron()

        this.unsubscribeKeyval = keyvalStore.listen(this.onKeyvalChange)
    }

    componentWillUnmount() {
        this.unsubscribeKeyval()
    }

    getBodyClassName = (all)=>(
        Object.entries(all)
            .filter(([key]) => key.includes('mode'))
            .map(([key]) => key)
            .join(' ')
    )

    onKeyvalChange = (all)=>{
        const className = this.getBodyClassName(all)

        if (className != this.state.body.className)
            this.setState({
                body: {
                    ...this.state.body,
                    className
                }
            })
    }

    render() {
        return (
            <>
                <Helmet 
                    titleTemplate='%s ― Raindrop.io'
                    defaultTitle='Raindrop.io'>
                    <html className={this.state.html.className} />
                    <body className={this.state.body.className} />
                </Helmet>

                {this.props.children}
            </>
        )
    }
}