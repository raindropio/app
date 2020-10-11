import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Content } from '~co/screen/splitview/main'
import Bookmarks from '~co/bookmarks'

class MyMainContent extends React.Component {
    events = {
        onBookmarkClick: item=>{
            const { query: { tab }, getLink, raindrops_click } = this.props

            switch (tab||raindrops_click) {
                case 'current_tab':
                    return false

                case 'new_tab':
                    window.open(item.link)
                    return true

                default:
                    this.props.history.push(
                        getLink({
                            bookmark: item._id,
                            tab: tab||raindrops_click
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

export default connect(
	(state) => ({
        raindrops_click: state.config.raindrops_click
    })
)(withRouter(MyMainContent))