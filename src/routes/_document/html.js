import './html.module.styl'
import React from 'react'
import debounce from '~modules/format/callback/debounce'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import { scrollbarIsObtrusive } from '~modules/browser'
import { target, environment } from '~target'

class DocumentHtml extends React.PureComponent {
    state = {
        className: [
            target,
            ...environment,
            scrollbarIsObtrusive() ? 'scrollbar-obtrusive' : '',
        ]
    }

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize)
    }

    onWindowResize = debounce(() => {
        if (screen.width === window.innerWidth &&
            screen.height === window.innerHeight)
            this.addClass('fullscreen')
        else
            this.removeClass('fullscreen')
    }, 300)

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

    render() {
        return (
            <Helmet>
                <html 
                    lang={this.props.lang}
                    className={this.state.className.join(' ')} />
            </Helmet>
        )
    }
}

export default connect(
    state=>({
        lang: state.config.lang
    })
)(DocumentHtml)