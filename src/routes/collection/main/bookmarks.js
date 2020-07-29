import React from 'react'
import { withRouter } from 'react-router-dom'
import { Content } from '~co/screen/splitview/main'
import Bookmarks from '~co/bookmarks'

class CollectionMainContent extends React.Component {
    events = {
        onItemClick: (item)=>{
            const { query } = this.props
            
            if (query.bookmark){
                this.props.history.push(
                    this.props.getLink({
                        bookmark: item._id
                    })
                )
                return true
            } else if (item.type!='link') {
                this.props.history.push(
                    this.props.getLink({
                        bookmark: item._id,
                        tab: ''
                    })
                )
                return true
            }
        }
    }

    render() {
        const { _id, search, query: { bookmark, full }, getLink } = this.props

        return (
            <Content>
                <Bookmarks 
                    spaceId={_id}
                    search={search}
                    full={full ? true : false}
                    activeId={bookmark && parseInt(bookmark)}
                    getLink={getLink}
                    events={this.events} />
            </Content>
        )
    }
}

export default withRouter(CollectionMainContent)