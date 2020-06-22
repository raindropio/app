import './html.module.styl'
import React from 'react'
import { Helmet } from 'react-helmet'

import isMobile from 'ismobilejs'
import { getCurrentBrowser, scrollbarIsObtrusive } from '~modules/strings'
import environment from '~modules/environment'

export default class DocumentHtml extends React.PureComponent {
    state = {
        className: [
            isMobile(navigator.userAgent).phone ? 'mobile' : 'web',
            ...getCurrentBrowser(),
            scrollbarIsObtrusive() ? 'scrollbar-obtrusive' : '',
            window.devicePixelRatio && devicePixelRatio >= 2 ? 'retina' : '',
            environment.isClipper() ? 'clipper' : ''
        ]
    }

    //utils
    addClass = (c)=>{
        if (!this.state.className.includes(c))
            this.setState({
                className: [
                    ...this.state.className,
                    c
                ]
            })
    }

    removeClass = (c)=>{
        if (this.state.className.includes(c))
            this.setState({
                className: this.state.className
                    .filter(name=>name!=c)
            })
    }

    //lifecycle
    componentDidMount() {
        window.addEventListener('focus', this.onWindowFocus)
        window.addEventListener('blur', this.onWindowBlur)
        window.addEventListener('resize', this.onWindowResize, true)
        window.addEventListener('orientationchange', this.onWindowResize)
    }

    componentWillUnmount() {
        window.removeEventListener('focus', this.onWindowFocus)
        window.removeEventListener('blur', this.onWindowBlur)
        window.removeEventListener('resize', this.onWindowResize, true)
        window.removeEventListener('orientationchange', this.onWindowResize)
    }

    onWindowFocus = () => this.removeClass('blur')
    onWindowBlur = () => this.addClass('blur')

    onWindowResize = ()=>{
        //Disable all transitions temporarly
        this.addClass('disable-layout-transition')

        clearTimeout(this.resizeTimeout)

        this.resizeTimeout = setTimeout(()=>
            this.removeClass('disable-layout-transition')
        , 400)
    }

    render() {
        return <Helmet><html className={this.state.className.join(' ')} /></Helmet>
    }
}