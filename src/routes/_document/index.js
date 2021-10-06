import './normalize.css'

import React from 'react'
import { Helmet } from 'react-helmet'

import HTML from './html'
import Body from './body'
import ScreenMaxSize from './screenMaxSize'

export default class Document extends React.Component {
    render() {
        return (
            <>
                <Helmet 
                    defer={false}
                    titleTemplate='%s ― Raindrop.io'
                    defaultTitle='Raindrop.io'>
                </Helmet>

                <ScreenMaxSize />
                <HTML/>
                <Body/>

                {this.props.children}
            </>
        )
    }
}