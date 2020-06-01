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
        return (
            <Header>
                <Search 
                    value={this.props.search}
                    events={this.searchEvents} />
    
                <Share {...this.props} />
    
                <Add {...this.props} />
            </Header>
        )
    }
}