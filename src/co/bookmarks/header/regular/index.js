import s from './index.module.styl'
import React from 'react'
import { connect } from 'react-redux'
import { makeCollection } from '~data/selectors/collections'
import { makeStatus } from '~data/selectors/bookmarks'

import Header, { Title as TitleWrap, Space } from '~co/common/header'
import Icon from './icon'
import Title from './title'
import Rename from './rename'
import Open from './open'
import More from './more'
import Sort from './sort'
import View from './view'

class BookmarksHeader extends React.Component {
    static defaultProps = {
        spaceId: 0,
        compact: false,
        getLink: undefined
    }

    render() {
        let { status } = this.props

        return (
            <Header 
                className={s.header}
                data-solid
                data-is-header>
                <Icon {...this.props} />

                <TitleWrap>
                    <Title {...this.props} />
                </TitleWrap>

                <Rename 
                    className={s.rename}
                    {...this.props} />

                <Open 
                    className={s.open}
                    {...this.props} />

                <Space />
                
                {status.main == 'loaded' ? (<>
                    <Sort {...this.props} />
                    <View {...this.props} />
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