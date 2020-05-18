import React from 'react'
import { Content } from '~co/screen/splitview/main'
import Bookmarks from '~co/bookmarks'

export default class CollectionsMainContent extends React.Component {
    events = {
        onTagClick: (tagName)=>{
            this.props.onSearch('#'+tagName, 'append')
        }
    }

    render() {
        const { cid, search, full } = this.props

        return (
            <Content>
                <Bookmarks 
                    cid={cid}
                    search={search}
                    full={full}
                    events={this.events} />
            </Content>
        )
    }
}