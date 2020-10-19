import React from 'react'
import { connect } from 'react-redux'
import { hideSection } from '~data/actions/config'
import { reorder } from '~data/actions/tags'

import View from './view'
import Contextmenu from './contextmenu'

class TagsSection extends React.PureComponent {
    static defaultProps = {
        //...item,
    }

    state = {
        menu: false
    }

    onClick = ()=>{
        this.props.hideSection(this.props._id, !this.props.hidden)
    }

    onSortTagsById = ()=>{
        this.props.reorder('_id')
    }

    onSortTagsByCount = ()=>{
        this.props.reorder('-count')
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
                    count={this.props.count}
                    hidden={this.props.hidden}
                    onClick={this.onClick}
                    onContextMenu={this.onContextMenu} />

                {this.state.menu ? (
                    <Contextmenu 
                        hidden={this.props.hidden}
                        onContextMenuClose={this.onContextMenuClose}
                        onClick={this.onClick}
                        onSortTagsById={this.onSortTagsById}
                        onSortTagsByCount={this.onSortTagsByCount} />
                ) : null}
            </>
        )
    }
}

export default connect(
	undefined,
	{ hideSection, reorder }
)(TagsSection)