import React from 'react'
import Icon from '~co/common/icon'
import Contextmenu from '~co/collections/item/contextmenu'

export default class BookmarksHeaderView extends React.Component {
    state = {
        menu: false
    }

    onContextMenuClick = (e)=>{
        e.preventDefault()
        this.setState({ menu: true })
    }

    onContextMenuClose = ()=>
        this.setState({ menu: false })

    onRemoveClick = ()=>{
        if (confirm('areYouSure'))
            this.props.collectionsActions.oneRemove(this.props.collection._id)
    }

    render() {
        const { menu } = this.state
        const { collection } = this.props

        return (
            <>
                <a href='' className='button default' onClick={this.onContextMenuClick}>
                    <Icon name='more_horizontal' />
                </a>

                {menu && (
                    <Contextmenu 
                        {...collection}
                        to={`/collection/${collection._id}`}
                        onRemoveClick={this.onRemoveClick}
                        onContextMenuClose={this.onContextMenuClose} />
                )}
            </>
        )
    }
}