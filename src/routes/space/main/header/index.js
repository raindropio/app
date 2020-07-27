import React from 'react'
import { Header } from '~co/screen/splitview/main'
import { Space } from '~co/common/header'
import Search from '~co/search'

import Add from './add'
import Share from './share'

export default class CollectionsMainHeader extends React.Component {
    state = {
        ssRef: { current: null }
    }

    bindSsRef = current=>{
        if (this.state.ssRef.current != current)
            this.setState({ ssRef: { current } })
    }

    searchEvents = {
        onSubmit: val=>{
            this.props.onSearch(val, 'current')
        }
    }

    render() {
        return (
            <>
                <Header>
                    <Search 
                        outerRef={this.state.ssRef}
                        spaceId={this.props.spaceId}
                        value={this.props.search}
                        events={this.searchEvents} />

                    <Space />
        
                    <Share {...this.props} />
        
                    <Add {...this.props} />
                </Header>

                <div ref={this.bindSsRef} />
            </>
        )
    }
}