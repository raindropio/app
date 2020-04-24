import React from 'react'
import { Helmet } from 'react-helmet'

import keyvalStore from '~stores/keyval'

export default class DocumentBody extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            className: this.getClassName(keyvalStore.onAll())
        }
    }

    componentDidMount() {
        this.unsubscribeKeyval = keyvalStore.listen(this.onKeyvalChange)
    }

    componentWillUnmount() {
        this.unsubscribeKeyval()
    }

    getClassName = (all)=>[
        `theme-sidebar-${all.theme||'default'}`
    ]

    onKeyvalChange = (all)=>{
        this.setState({
            className: this.getClassName(all)
        })
    }

    render() {
        return <Helmet><body className={this.state.className.join(' ')} /></Helmet>
    }
}