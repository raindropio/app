import React from 'react'
import { connect } from 'react-redux'
import { hideSection } from '~data/actions/config'

import View from './view'
import Contextmenu from './contextmenu'

class FiltersSection extends React.PureComponent {
    static defaultProps = {
        //...item,
    }

    state = {
        menu: false
    }

    onClick = ()=>{
        this.props.hideSection(this.props._id, !this.props.hidden)
    }

    onContextMenu = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        e.target.focus()
        this.setState({ menu: true })
    }

    onContextMenuClose = ()=>
        this.setState({ menu: false })

    render() {
        return (
            <>
                <View 
                    hidden={this.props.hidden}
                    onClick={this.onClick}
                    onContextMenu={this.onContextMenu} />

                {this.state.menu ? (
                    <Contextmenu 
                        hidden={this.props.hidden}
                        onClick={this.onClick}
                        onContextMenuClose={this.onContextMenuClose} />
                ) : null}
            </>
        )
    }
}

export default connect(
	undefined,
	{ hideSection }
)(FiltersSection)