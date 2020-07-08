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