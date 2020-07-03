import React from 'react'
import { connect } from 'react-redux'
import { makeCollection } from '~data/selectors/collections'
import { makeStatus } from '~data/selectors/bookmarks'

import Header, { Title as TitleWrap, Space } from '~co/common/header'
import Back from './back'
import Icon from './icon'
import Title from './title'
import More from './more'
import Sort from './sort'
import View from './view'
import SelectAll from './selectAll'

class BookmarksHeader extends React.Component {
    static defaultProps = {
        spaceId: 0,
        compact: false
    }

    render() {
        let { collection: { title }, status } = this.props

        //removed or not found collection
        if (!title) return null

        return (
            <Header data-fancy>
                <Back {...this.props} />
                <Icon {...this.props} />

                <TitleWrap>
                    <Title {...this.props} />
                </TitleWrap>

                <Space />
                
                {status.main == 'loaded' ? (<>
                    <Sort {...this.props} />
                    <View {...this.props} />
                    <SelectAll {...this.props} />
                </>) : null}
                <More {...this.props} />
            </Header>
        )
    }
}

export default connect(
	() => {
        const getCollection = makeCollection()
        const getStatus = makeStatus()
    
        return (state, { spaceId })=>({
            collection: getCollection(state, spaceId),
            status: getStatus(state, spaceId),
        })
    }
)(BookmarksHeader)