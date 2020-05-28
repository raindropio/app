import React from 'react'
import View from './view'
import Contextmenu from './contextmenu'

export default class FiltersSection extends React.PureComponent {
    static defaultProps = {
        //...item,
        actions:    {} //redux filters, config
    }

    state = {
        menu: false
    }

    handlers = {
        onClick: ()=>{
            this.props.actions.sidebarHide(this.props._id, !this.props.hidden)
        },

        onSortTagsById: ()=>{
            this.props.actions.reorder('_id')
        },

        onSortTagsByCount: ()=>{
            this.props.actions.reorder('-count')
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

                {this.state.menu ? (
                    <Contextmenu 
                        {...this.props}
                        {...this.handlers} />
                ) : null}
            </>
        )
    }
}