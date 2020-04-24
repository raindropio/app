import '../../css/base.styl'

import React from 'react'
import { Helmet } from 'react-helmet'
import environment from '~modules/environment'

import HTML from './html'
import Body from './body'

export default class Document extends React.Component {
    componentDidMount() {
        environment.initElectron()
    }

    render() {
        return (
            <>
                <Helmet 
                    titleTemplate='%s ― Raindrop.io'
                    defaultTitle='Raindrop.io'>
                </Helmet>

                <HTML/>
                <Body/>

                {this.props.children}
            </>
        )
    }
}