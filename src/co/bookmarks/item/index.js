import React from 'react'
import { connect } from 'react-redux'
import { makeBookmark, makeHighlight, makeIsSelected, makeSelectModeEnabled } from '~data/selectors/bookmarks'

class BookmarkItem extends React.Component {
    static defaultProps = {
        _id:        0,
        events:     {}, //same as ...items/index
        actions:    {}  //redux collections
    }

    handlers = {
        onClick: this.props.events.onItemSelect ?
            ()=>
                this.props.events.onItemSelect(this.props.item) :
            undefined,
    
        onRemoveClick: ()=>
            this.props.actions.oneRemove(this.props.item._id),
    
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
        return (
            <div>
                {this.props.item.title}
            </div>
        )
    }
}

export default connect(
	() => {
        const getIsSelected = makeIsSelected()
        const getBookmark = makeBookmark()
        const getHighlight = makeHighlight()
        const getSelectModeEnabled = makeSelectModeEnabled()
    
        return (state, { _id, cid })=>{
            const item = getBookmark(state, _id)
            const selectModeEnabled = getSelectModeEnabled(state, cid)
    
            return {
                item,
                highlight: getHighlight(state, _id),
                selected: selectModeEnabled ? getIsSelected(state, cid, _id) : false,
                selectModeEnabled
            };
        }
    }
)(BookmarkItem)