import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { bookmark, tags, makeIsSelected, makeHighlight, makeCreatorRef, makeSelectModeEnabled, selectModeWorking, getCoverSize } from '~data/selectors/bookmarks'
import * as bookmarksActions from '~data/actions/bookmarks'
import { copyText } from '~modules/browser'

import View from './view'
import Contextmenu from './contextmenu'

class BookmarkItem extends React.Component {
    static defaultProps = {
        //bookmarks
        _id:                0,
        active:             false,
        //collection
        spaceId:            0,
        view:               '', //list, grid, etc...
        access:             {}, //{ level }...
        //funcs
        getLink:            undefined, //same as ...items/index
        events:             {}, //same as ...items/index
        actions:            {}, //redux collections
        //special
        innerRef:           undefined
    }

    state = {
        menu: false
    }

    handlers = {
        onClick: (e)=>{
            if (!e) return

            const { selectModeEnabled, item } = this.props

            if (e.metaKey || e.ctrlKey || e.nativeEvent.which==3){
                e.preventDefault()
                return window.open(item.link)
            }

            if (selectModeEnabled || e.shiftKey){
                e.preventDefault()
                return this.handlers.onSelectClick(e)
            }

            if (typeof this.props.events.onBookmarkClick == 'function' && 
                this.props.events.onBookmarkClick(item))
                e.preventDefault()
        },

        onDoubleClick: (e)=>{
            e.preventDefault()
            window.open(this.props.item.link)
        },

        onSelectClick: (e={})=>
            this.props.actions[(this.props.selected && !e.shiftKey) ? 'unselectOne' : 'selectOne'](this.props.spaceId, this.props.item._id, e.shiftKey),

        onImportantClick: ()=>
            this.props.actions.oneImportant(this.props.item._id),
    
        onRemoveClick: ()=>
            this.props.actions.oneRemove(this.props.item._id),

        onCopyLinkClick: ()=>
            copyText(this.props.item.link),

        onCreateScreenshotClick: ()=>
            this.props.actions.oneScreenshot(this.props.item._id),

        onReparseClick: ()=>
            this.props.actions.oneReparse(this.props.item._id),
    
        onContextMenu: (e)=>{
            e.preventDefault()
            e.target.focus()
            this.setState({ menu: true })
        },
    
        onContextMenuClose: ()=>
            this.setState({ menu: false }),
    
        onKeyUp: (e)=>{
            switch(e.keyCode){
                case 46: //delete
                case 8: //backspace
                    e.preventDefault()
                    return this.handlers.onRemoveClick()
    
                case 13: //enter
                    e.preventDefault()
                    return this.handlers.onClick()
            }
        }
    }

    render() {
        const { item, ...props } = this.props

        return (
            <>
                <View 
                    {...item}
                    {...props}
                    {...this.handlers}
                    />

                {this.state.menu ? (
                    <Contextmenu 
                        {...item}
                        {...props}
                        {...this.handlers} />
                ) : null}
            </>
        )
    }
}

export default connect(
	() => {
        const getIsSelected = makeIsSelected()
        const getHighlight = makeHighlight()
        const getCreatorRef = makeCreatorRef()
        const getSelectModeEnabled = makeSelectModeEnabled()
    
        return (state, { _id, spaceId, view })=>{
            const item = bookmark(state, _id)
            const selectModeEnabled = getSelectModeEnabled(state, spaceId)
    
            return {
                item,
                tags: tags(state, _id),
                selected: selectModeEnabled ? getIsSelected(state, spaceId, _id) : false,
                selectModeEnabled,
                selectDisabled: selectModeWorking(state) ? true : false,
                highlight: getHighlight(state, spaceId, _id),
                creatorRef: getCreatorRef(state, _id),
                coverSize: getCoverSize(state, view)
            }
        }
    },
    (dispatch)=>({
		actions: bindActionCreators(bookmarksActions, dispatch)
    })
)(BookmarkItem)