import s from './index.module.styl'
import React from 'react'
import { connect } from 'react-redux'
import { makeCollection } from '~data/selectors/collections'
import { makeStatus } from '~data/selectors/bookmarks'

import Header, { Title as TitleWrap, Space } from '~co/common/header'
import Icon from './icon'
import Title from './title'
import Rename from './rename'
import More from './more'
import Sort from './sort'
import View from './view'
import SelectAll from './selectAll'

class BookmarksHeader extends React.Component {
    static defaultProps = {
        spaceId: 0,
        compact: false,
        getLink: undefined
    }

    render() {
        let { collection: { title }, status } = this.props

        //removed or not found collection
        if (!title) return null

        return (
            <Header 
                className={s.header}
                data-solid>
                <Icon {...this.props} />

                <TitleWrap>
                    <Title {...this.props} />
                </TitleWrap>

                <Rename 
                    className={s.rename}
                    {...this.props} />

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