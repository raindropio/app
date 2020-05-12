import React from 'react'
import t from '~t'

import Rename from './rename'
import View from './view'
import Contextmenu from './contextmenu'

export default class FiltersTag extends React.PureComponent {
    static defaultProps = {
        //...item,
        to:         '',
        active:     false,
        actions:    {} //redux tags
    }

    state = {
        rename: false,
        menu: false,
        sharing: false
    }

    handlers = {
        onRenameClick: ()=>
            this.setState({ rename: true }),
        
        onRenameCancel: ()=>
            this.setState({ rename: false }),

        onRename: (newName, success, fail)=>
            this.props.actions.oneRename(this.props._id, newName, success, fail),
    
        onRemoveClick: ()=>{
            if (confirm(t.s('areYouSure')))
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

                {this.state.menu && (
                    <Contextmenu 
                        {...this.props}
                        {...this.handlers} />
                )}
            </>
        )
    }
}