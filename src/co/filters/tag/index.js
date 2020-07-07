import React from 'react'
import t from '~t'

import { Confirm } from '~co/overlay/dialog'
import Rename from './rename'
import View from './view'
import Contextmenu from './contextmenu'

export default class FiltersTag extends React.PureComponent {
    static defaultProps = {
        //...item,
        to:         '',
        active:     false,
        canAppend:  false,
        actions:    {}, //redux tags
        events:     {}  //onItemClick, onItemAppendClick
    }

    state = {
        rename: false,
        menu: false,
        sharing: false
    }

    handlers = {
        onClick: ()=>
            this.props.events.onItemClick(this.props.query),

        onAppendClick: this.props.events.onItemAppendClick ? ()=>
            this.props.events.onItemAppendClick(this.props.query) : undefined,

        onRenameClick: ()=>
            this.setState({ rename: true }),
        
        onRenameCancel: ()=>
            this.setState({ rename: false }),

        onRename: (newName, success, fail)=>
            this.props.actions.oneRename(this.props._id, newName, success, fail),
    
        onRemoveClick: async()=>{
            if (await Confirm(t.s('areYouSure'), { variant: 'warning' }))
                this.props.actions.oneRemove(this.props._id)
        },
    
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
                    return this.handlers.onRenameClick()
            }
        }
    }

    render() {
        const Component = (this.state.rename ? Rename : View)

        return (
            <>
                <Component 
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