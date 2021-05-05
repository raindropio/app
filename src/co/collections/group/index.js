import React from 'react'
import t from '~t'
import View from './view'
import Contextmenu from './contextmenu'
import { Alert, Confirm, Prompt, Error } from '~co/overlay/dialog'

export default class CollectionsGroup extends React.PureComponent {
    static defaultProps = {
        //...item,
        active:     false,
        events:     {}, //same as ...items/index
        actions:    {} //redux collections
    }

    state = {
        rename: false,
        menu: false
    }

    handlers = {
        onClick: ()=>{
            if (this.props.events.onGroupClick)
                return this.props.events.onGroupClick(this.props)
                
            this.handlers.onToggleClick()
        },

        onCreateNewCollectionClick: (e)=>{
            e.preventDefault()
            e.stopPropagation()
            this.props.actions.addBlank(this.props._id)
        },

        onCreateNewGroupClick: async()=>{
            const title = await Prompt(t.s('enterTitle'))
            if (title)
                this.props.actions.groupCreate(title)
        },

        onSelectAll: ()=>
            this.props.actions.selectAll(this.props._id),

        onRenameClick: async()=>{
            const title = await Prompt(t.s('enterTitle'), this.props.title)

            if (title)
                this.props.actions.groupRename(this.props._id, title)
        },

        onToggleClick: ()=>{
            this.props.actions.groupToggle(this.props._id)
        },

        onRemoveClick: ()=>{
            this.props.actions.groupRemove(this.props._id, undefined, ()=>{
                Alert(t.s('removeGroupError'), { variant: 'error' })
            })
        },

        onCollapseAllClick: ()=>{
            this.props.actions.toggle()
        },

        onSortAllByTitleClick: async()=>{
            if (await Confirm(t.s('areYouSure'), { variant: 'warning' }))
                this.props.actions.reorder('title')
        },

        onCleanClick: async()=>{
            if (await Confirm(t.s('areYouSure'), { variant: 'warning' }))
                this.props.actions.clean(
                    count=>
                        Alert(`${count} ${t.s('removeCollectionSuccess').toLowerCase()}`),
                    Error
                )
        },
    
        onContextMenu: (e)=>{
            e.preventDefault()
            e.stopPropagation()
            e.target.focus()
            this.setState({ menu: true })
        },
    
        onContextMenuClose: ()=>
            this.setState({ menu: false }),
    }

    render() {
        return (
            <>
                <View 
                    {...this.props}
                    {...this.handlers} />

                {this.state.menu ? (
                    <Contextmenu 
                        {...this.props}
                        {...this.handlers} />
                ) : null}
            </>
        )
    }
}