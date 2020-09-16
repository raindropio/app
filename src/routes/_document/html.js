import './html.module.styl'
import React from 'react'
import t from '~t'
import { Helmet } from 'react-helmet'

import isMobile from 'ismobilejs'
import { scrollbarIsObtrusive } from '~modules/browser'
import { target, environment } from '~target'

export default class DocumentHtml extends React.PureComponent {
    state = {
        className: [
            ...(isMobile(navigator.userAgent).phone ? ['mobile'] : []),
            target,
            ...environment,
            scrollbarIsObtrusive() ? 'scrollbar-obtrusive' : '',
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

    render() {
        return (
            <Helmet>
                <html 
                    lang={t.currentLang}
                    className={this.state.className.join(' ')} />
            </Helmet>
        )
    }
}