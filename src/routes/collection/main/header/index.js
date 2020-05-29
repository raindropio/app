import React from 'react'
import { Header } from '~co/screen/splitview/main'
import Search from '~co/search'

import Add from './add'
import Share from './share'

export default class CollectionsMainHeader extends React.Component {
    searchEvents = {
        onSubmit: val=>{
            this.props.onSearch(val, 'current')
        }
    }

    render() {
        const { cid, search } = this.props

        return (
            <Header>
                <Search 
                    value={search}
                    events={this.searchEvents} />
    
                <Share 
                    cid={cid} />
    
                <Add
                    cid={cid} />
            </Header>
        )
    }
}