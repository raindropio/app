import 'normalize.css/normalize.css'

import React from 'react'
import { Helmet } from 'react-helmet'
import Div100vh from 'react-div-100vh'

import HTML from './html'
import Body from './body'

export default class Document extends React.Component {
    render() {
        return (
            <>
                <Helmet 
                    titleTemplate='%s ― Raindrop.io'
                    defaultTitle='Raindrop.io'>
                </Helmet>

                <HTML/>
                <Body/>

                <Div100vh>{this.props.children}</Div100vh>
            </>
        )
    }
}