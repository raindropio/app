import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as bookmarksActions from '~data/actions/bookmarks'
import { makeBookmark } from '~data/selectors/bookmarks'
import { makeCollection } from '~data/selectors/collections'

import Wrap from './wrap'

class CollectionsReader extends React.Component {
    static defaultProps = {
        reader: {} //bookmark, tab
    }

    state = {
        fullscreen: false
    }

    handlers = {
        onBackClick: ()=>
            this.props.onReader(),

        onFullscreenToggleClick: ()=>
            this.setState({ fullscreen: !this.state.fullscreen }),

        setTab: (tab)=>
            this.props.onReader({ ...this.props.reader, tab }),
    }

    render() {
        return (
            <Wrap {...this.state} {...this.props} {...this.handlers} />
        )
    }
}

export default connect(
    ()=>{
        const getBookmark = makeBookmark()
        const getCollection = makeCollection()

        return (state, { reader })=>{
            const item = getBookmark(state, parseInt(reader.bookmark))
            const { access } = getCollection(state, item.collectionId)

            //available tabs
            const tab = reader.tab || 'preview'
            const tabs = [
                'web', 
                ...access.level>=3?['edit']:[], 
                ...item.cache && access.level>=3?['cache']:[],
                ...item.type!='link'?['preview']:[],
            ]

            return {
                item,
                tab: tabs.includes(tab) ? tab : tabs[0],
                tabs,
                access
            }
        }
    },
    (dispatch)=>({
		actions: bindActionCreators(bookmarksActions, dispatch)
    }),
)(CollectionsReader)