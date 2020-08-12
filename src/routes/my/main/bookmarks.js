import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Content } from '~co/screen/splitview/main'
import Bookmarks from '~co/bookmarks'

class MyMainContent extends React.Component {
    render() {
        const { _id, search, query: { bookmark, full, tab }, getLink, raindrops_click } = this.props

        return (
            <Content>
                <Bookmarks 
                    spaceId={_id}
                    search={search}
                    full={full ? true : false}
                    activeId={bookmark && parseInt(bookmark)}
                    getLink={getLink}
                    mainAction={tab ? tab : raindrops_click} />
            </Content>
        )
    }
}

export default connect(
	(state) => ({
        raindrops_click: state.config.raindrops_click
    })
)(withRouter(MyMainContent))