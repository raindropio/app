import React from 'react'
import { connect } from 'react-redux'
import { makeSelectMode } from '~data/selectors/bookmarks'

import Header, { Title as TitleWrap, Space } from '~co/common/header'
import Title from './title'
import AddTags from './addTags'
import Move from './move'
import Checkbox from './checkbox'
import More from './more'
import Remove from './remove'
import Open from './open'
import Working from './working'
import Cancel from './cancel'

class BookmarksSelectMode extends React.Component {
    render() {
        if (this.props.selectMode.working)
            return <Working {...this.props} />

        return (
            <Header data-solid>
                <Checkbox {...this.props} />
                <TitleWrap><Title {...this.props} /></TitleWrap>

                <Space />

                <Move {...this.props} />
                <AddTags {...this.props} />
                <Remove {...this.props} />
                <Open {...this.props} />
                <Space />
                <More {...this.props} />
                <Cancel {...this.props} />
            </Header>
        )
    }
}

export default connect(
	() => {
        const getSelectMode = makeSelectMode()
    
        return (state, { spaceId })=>({
            selectMode: getSelectMode(state, spaceId)
        })
    }
)(BookmarksSelectMode)