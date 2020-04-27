import React from 'react'
import { withSearch } from '~modules/router'
import Reader from '~co/screen/splitview/reader'

import Header from './header'

class CollectionsReader extends React.Component {
    state = {
        support: ['web', 'edit', 'cache', 'preview'],
        fullscreen: false
    }

    actions = {
        back: ()=>
            this.props.search.delete(['id', 'tab']),

        fullscreenToggle: ()=>
            this.setState({ fullscreen: !this.state.fullscreen }),

        setTab: (tab)=>
            this.props.search.set('tab', tab, true),
        
        important: ()=>{},
        remove: ()=>{}
    }

    render() {
        const { id, tab='preview' } = this.props.search.params

        return (
            <Reader 
                show={id?true:false}
                fullscreen={this.state.fullscreen}>
                <Header
                    {...this.state}
                    tab={tab}
                    actions={this.actions} />
            </Reader>
        )
    }
}

export default withSearch(CollectionsReader)