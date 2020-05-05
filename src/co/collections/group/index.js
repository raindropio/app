import React from 'react'
import t from '~t'
import View from './view'
import Contextmenu from './contextmenu'

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

        onCreateNewCollectionClick: ()=>{
            this.props.actions.addBlank(this.props._id)
        },

        onCreateNewGroupClick: ()=>{
            const title = prompt(t.s('enterTitle'))
            if (title)
                this.props.actions.groupCreate(title)
        },

        onRenameClick: ()=>{
            const title = prompt(t.s('enterTitle'), this.props.title)

            if (title)
                this.props.actions.groupRename(this.props._id, title)
        },

        onToggleClick: ()=>{
            this.props.actions.groupToggle(this.props._id)
        },

        onRemoveClick: ()=>{
            this.props.actions.groupRemove(this.props._id)
        },

        onCollapseAllClick: ()=>{
            this.props.actions.toggle()
        },

        onSortAllByTitleClick: ()=>{
            if (confirm(t.s('areYouSure')))
                this.props.actions.reorder('title')
        },
    
        onContextMenu: (e)=>{
            e.preventDefault()
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

                {this.state.menu && (
                    <Contextmenu 
                        {...this.props}
                        {...this.handlers} />
                )}
            </>
        )
    }
}