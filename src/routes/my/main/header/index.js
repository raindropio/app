import React from 'react'
import { Header } from '~co/screen/splitview/main'
import { Space } from '~co/common/header'
import Search from '~co/search'
import { withRouter } from 'react-router-dom'
import { target } from '~target'

import Add from './add'
import Share from './share'

class MyMainHeader extends React.Component {
    searchEvents = {
        onSubmit: search=>{
            if (this.props.search != search)
                this.props.history.push(
                    this.props.getLink({ search })
                )
        }
    }

    render() {
        return (
            <Header>
                <Search 
                    autoFocus={target=='extension'}
                    spaceId={this.props._id}
                    value={this.props.search}
                    events={this.searchEvents} />

                <Space />
    
                <Share {...this.props} />
    
                <Add {...this.props} />
            </Header>
        )
    }
}

export default withRouter(MyMainHeader)