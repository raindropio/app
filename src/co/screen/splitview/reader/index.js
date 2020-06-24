import React from 'react'
import { Context } from '..'

import Header from './header'
import Content from './content'
import Footer from './footer'

export default class SplitViewReader extends React.PureComponent {
    static defaultProps = {
        show: false
    }
    static contextType = Context

    componentDidMount() {
        this.onChange()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.show != this.props.show ||
            prevProps.fullscreen != this.props.fullscreen)
        this.onChange(this.props)
    }

    onChange = ()=>{
        const { show=true, fullscreen=false } = this.props
        this.context.update('reader', { show, fullscreen })
    }

    render() {
        return (
            <>
                <aside id='reader' className={this.props.className} style={this.props.style}>
                    {this.props.show && this.props.children}
                </aside>
                <div id='reader-black-overlay'/>
            </>
        )
    }
}

export {
    Header,
    Content,
    Footer,
}