import React from 'react'
import { connect } from 'react-redux'
import { getDraftStatus } from '~data/selectors/bookmarks'

//React to draft change events
class BookmarkletEvents extends React.Component {
    componentDidUpdate(prev) {
        const { status } = this.props

        //close window when bookmark is removed
        if (prev.status != status &&
            status == 'removed')
            window.close()
    }

    render() {
        return null
    }
}

export default connect(
    (state, { link })=>({
        status: getDraftStatus(state, link)
    })
)(BookmarkletEvents)