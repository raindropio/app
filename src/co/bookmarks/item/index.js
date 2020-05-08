import React from 'react'
import { connect } from 'react-redux'
import { bookmark, tags, makeIsSelected } from '~data/selectors/bookmarks'
import { copyTextToClipboard } from '~modules/strings'

import View from './view'
import Contextmenu from './contextmenu'

class BookmarkItem extends React.Component {
    static defaultProps = {
        //bookmarks
        _id:                0,
        active:             false,
        //collection
        cid:                0,
        view:               '', //list, grid, etc...
        access:             {}, //{ level }...
        selectModeEnabled:  false,
        //funcs
        events:             {}, //same as ...items/index
        actions:            {}  //redux collections
    }

    state = {
        menu: false
    }

    handlers = {
        onClick: (e)=>{
            if (this.props.selectModeEnabled){
                e.preventDefault()
                return this.handlers.onSelectClick()
            }
                
            if (this.props.events.onItemClick){
                e.preventDefault()
                this.props.events.onItemClick(this.props.item)
            }
        },

        onEditClick: ()=>{

        },

        onSelectClick: ()=>{
            this.props.actions[this.props.selected ? 'unselectOne' : 'selectOne'](this.props.cid, this.props.item._id)
        },

        onImportantClick: ()=>
            this.props.actions.oneImportant(this.props.item._id),
    
        onRemoveClick: ()=>
            this.props.actions.oneRemove(this.props.item._id),

        onCopyLinkClick: ()=>
            copyTextToClipboard(this.props.item.link),

        onPreviewClick: ()=>
            this.props.events.onItemClick(this.props.item),

        onCacheClick: ()=>{},

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

                {this.state.menu && (
                    <Contextmenu 
                        {...item}
                        {...props}
                        {...this.handlers} />
                )}
            </>
        )
    }
}

export default connect(
	() => {
        const getIsSelected = makeIsSelected()
    
        return (state, { _id, cid, selectModeEnabled })=>{
            const item = bookmark(state, _id)
    
            return {
                item,
                tags: tags(state, _id),
                selected: selectModeEnabled ? getIsSelected(state, cid, _id) : false
            }
        }
    }
)(BookmarkItem)