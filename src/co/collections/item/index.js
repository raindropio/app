import React from 'react'
import t from '~t'

import { Confirm } from '~co/overlay/dialog'
import Blank from './blank'
import View from './view'
import Rename from './rename'
import Contextmenu from './contextmenu'

import DropBookmarks from '~co/bookmarks/dnd/drop'
import Sharing from '../sharing'
import ChangeIcon from '../changeIcon'
import ProCheck from '~co/user/pro/check'
import OpenAllBookmarks from '~co/bookmarks/openAll'

export default class CollectionsItem extends React.PureComponent {
    static defaultProps = {
        item:       {},
        active:     false,
        multiselect:false,
        events:     {}, //same as ...items/index
        actions:    {} //redux collections
    }

    state = {
        rename: false,
        menu: false,
        sharing: false,
        openAll: false
    }

    handlers = {
        onClick: (e)=>{
            const { item, multiselect, events, actions } = this.props

            //create new
            if (item._id == -100){
                e.preventDefault()
                return actions.oneCreate({ title: item.title }, events.onItemClick)
            }

            //select
            if (item._id > 0)
                if (multiselect || e.shiftKey){
                    e.preventDefault()
                    return this.handlers.onSelectClick()
                }

            //click on item
            if (events.onItemClick){
                if (events.onItemClick(item)!='continue')
                    e.preventDefault()
                else
                    return
            }

            //otherwise usual click on href
        },

        onOpenAllClick: ()=>
            this.setState({ openAll: true }),

        opOpenAllClose: ()=>
            this.setState({ openAll: false }),

        onSelectClick: ()=>{
            const { active, multiselect, actions: { selectOne, unselectOne } } = this.props

            if (active && multiselect)
                unselectOne(this.props.item._id)
            else
                selectOne(this.props.item._id)
        },
    
        onExpandClick: ()=>
            this.props.actions.oneToggle(this.props.item._id),
    
        onRenameClick: ()=>{
            if (!this.props.multiselect && 
                this.props.item._id > 0 &&
                this.props.item.access &&
                this.props.item.access.level>=3)
                this.setState({ rename: true })
        },
        
        onRenameCancel: ()=>
            this.setState({ rename: false }),

        onIconClick: ()=>
            this.setState({ icon: true }),

        onIconClose: ()=>
            this.setState({ icon: false }),
    
        onRemoveClick: async()=>{
            if ((!this.props.item.count && !this.props.expandable) || 
                await Confirm(t.s('areYouSure'), {
                    variant: 'warning',
                    description: this.props.item._id != -99 ? t.s('collectionDeleteConfirm') : '',
                    ok: this.props.item._id != -99 ? (t.s('remove')+' '+this.props.item.title) : t.s('emptyTrash')
                }))
                this.props.actions.oneRemove(this.props.item._id)
        },
    
        onContextMenu: (e)=>{
            e.preventDefault()
            e.target.focus()
            
            if (!this.props.multiselect)
                this.setState({ menu: true })
        },
    
        onContextMenuClose: ()=>
            this.setState({ menu: false }),

        onSharing: ()=>
            this.setState({ sharing: true }),
    
        onSharingClose: ()=>
            this.setState({ sharing: false }),

        onCreateNewChildClick: async()=>{
            if (await ProCheck('nested'))
                this.props.actions.addBlank(this.props.item._id, true)
        },
    
        onKeyUp: (e)=>{
            if (this.props.multiselect)
                return

            switch(e.keyCode){
                case 37: //left
                case 39: //right
                    e.preventDefault()
                    return this.handlers.onExpandClick()
    
                case 46: //delete
                case 8: //backspace
                    e.preventDefault()
                    return this.handlers.onRemoveClick()
    
                case 13: //enter
                    e.preventDefault()
                    return this.handlers.onRenameClick()
            }
        }
    }

    render() {
        const { item, getLink, ...props } = this.props

        const Component = item._id == -101 ?
            Blank :
            (this.state.rename ? Rename : View)

        const to = getLink ? getLink({ _id: item._id }) : ''

        return (
            <>
                <DropBookmarks spaceId={item._id}>
                    {drop=>
                        <Component 
                            {...item}
                            {...props}
                            {...drop}
                            isDropping={props.isDropping||drop.isDropping}
                            {...this.handlers}
                            to={to} />
                    }
                </DropBookmarks>

                {this.state.menu ? (
                    <Contextmenu 
                        {...item}
                        {...props}
                        {...this.handlers}
                        to={to} />
                ) : null}

                {this.state.sharing ? (
                    <Sharing 
                        _id={item._id}
                        onClose={this.handlers.onSharingClose} />
                ) : null}

                {this.state.icon ? (
                    <ChangeIcon
                        _id={item._id}
                        onClose={this.handlers.onIconClose} />
                ) : null}

                {this.state.openAll ? (
                    <OpenAllBookmarks
                        spaceId={item._id}
                        onClose={this.handlers.opOpenAllClose}
                        />
                ) : null}
            </>
        )
    }
}