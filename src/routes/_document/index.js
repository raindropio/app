import './normalize.css'

import React from 'react'
import { Helmet } from 'react-helmet'

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

                {this.props.children}
            </>
        )
    }
}