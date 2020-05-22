import React from 'react'
import Reader from '~co/screen/splitview/reader'

import Header from './header'

export default class CollectionsReader extends React.Component {
    state = {
        support: ['web', 'edit', 'cache', 'preview'],
        fullscreen: false
    }

    actions = {
        back: ()=>
            this.props.onReader(),

        fullscreenToggle: ()=>
            this.setState({ fullscreen: !this.state.fullscreen }),

        setTab: (tab)=>
            this.props.onReader({ ...this.props.reader, tab }),
        
        important: ()=>{},
        remove: ()=>{}
    }

    render() {
        const { reader: {bookmark, tab='preview'} } = this.props

        return (
            <Reader 
                show={bookmark?true:false}
                fullscreen={this.state.fullscreen}>
                <Header
                    {...this.state}
                    tab={tab}
                    actions={this.actions} />
            </Reader>
        )
    }
}