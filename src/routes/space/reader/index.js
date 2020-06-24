import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as bookmarksActions from '~data/actions/bookmarks'
import { makeBookmark } from '~data/selectors/bookmarks'
import { makeCollection } from '~data/selectors/collections'

import Reader from '~co/screen/splitview/reader'
import Header from './header'
import Content from './content'
import AccentColor from '~co/collections/item/accentColor'

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
        const { item, spaceId, font_color } = this.props
        const { fullscreen } = this.state

        return (
            <AccentColor _id={spaceId}>{style=>
                <Reader 
                    show={item._id?true:false}
                    fullscreen={fullscreen}
                    data-theme={font_color}
                    style={style}>
                    <Header {...this.props} {...this.handlers} />
                    <Content key={item._id} {...this.props} />
                </Reader>
            }</AccentColor>
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
            const tab = reader.tab
            const tabs = [
                'preview', 
                ...access.level>=3?['edit']:[], 
                ...item.cache && access.level>=3?['cache']:[],
            ]

            return {
                item,
                tab: tabs.includes(tab) ? tab : tabs[0],
                tabs,
                access,
                font_color: state.config.font_color
            }
        }
    },
    (dispatch)=>({
		actions: bindActionCreators(bookmarksActions, dispatch)
    }),
)(CollectionsReader)