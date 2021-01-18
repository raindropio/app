import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { target } from '~target'
import { oneLoad } from '~data/actions/bookmarks'
import { makeBookmark } from '~data/selectors/bookmarks'
import { makeCollection } from '~data/selectors/collections'

import Reader from '~co/screen/splitview/reader'
import Header from './header'
import Content from './content'
import AccentColor from '~co/collections/item/accentColor'

class MyReader extends React.Component {
    static defaultProps = {
        query: {} //bookmark, tab
    }

    state = {
        fullscreen: false
    }

    componentDidMount() {
        this.load()
    }

    componentDidUpdate(prev) {
        const { query } = this.props
        if (prev.query.bookmark != query.bookmark)
            this.load()
    }

    load = ()=>{
        const { query, item } = this.props
        if (query.bookmark && !item._id)
            this.props.oneLoad(query.bookmark)
    }

    handlers = {
        onFullscreenToggleClick: ()=>
            this.setState({ fullscreen: !this.state.fullscreen }),

        setTab: (tab)=>
            this.props.history.replace(
                this.props.getLink({ tab })
            )
    }

    render() {
        const { item, _id, font_color, tab } = this.props
        const { fullscreen } = this.state

        return (
            <AccentColor _id={_id}>{style=>
                <Reader 
                    show={item._id?true:false}
                    fullscreen={fullscreen}
                    data-theme={tab=='preview' && item.type == 'article' && font_color ? font_color : undefined}
                    style={style}>
                    <Header {...this.props} {...this.handlers} />
                    <Content {...this.props} />
                </Reader>
            }</AccentColor>
        )
    }
}

export default connect(
    ()=>{
        const getBookmark = makeBookmark()
        const getCollection = makeCollection()

        return (state, { query: { tab, bookmark } })=>{
            const item = getBookmark(state, parseInt(bookmark))
            const { access } = getCollection(state, item.collectionId)

            //available tabs
            const tabs = [
                ...target != 'extension' && item.type!='link' ? ['preview'] : [], 
                ...target != 'extension' ? ['web'] : [], 
                ...access && access.level>=3?['edit']:[], 
                ...item.cache && access && access.level>=3?['cache']:[],
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
    { oneLoad }
)(
    withRouter(
        MyReader
    )
)