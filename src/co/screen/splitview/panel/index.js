import React from 'react'
import { Context } from '../'

import Header from './header'
import Content from './content'
import Footer from './footer'

export default class SplitViewPanel extends React.Component {
    static defaultProps = {
        show: false
    }
    static contextType = Context

    componentDidMount() {
        this.onChange()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.show != this.props.show)
        this.onChange(this.props)
    }

    onChange = ()=>{
        const { show=true } = this.props
        this.context.update('panel', { show })
    }
    
    render() {
        return (
            <aside id='panel'>
                {this.props.children}
            </aside>
        )
    }
}

export {
    Header,
    Content,
    Footer,
}