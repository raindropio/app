import React from 'react'
import { Helmet } from 'react-helmet'

export default class DocumentBody extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            className: []
        }
    }

    render() {
        return <Helmet><body className={this.state.className.join(' ')} /></Helmet>
    }
}