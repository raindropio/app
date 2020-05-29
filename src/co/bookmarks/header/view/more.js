import React from 'react'
import t from '~t'
import Icon from '~co/common/icon'
import Contextmenu from '~co/collections/item/contextmenu'
import ChangeIcon from '~co/collections/changeIcon'

export default class BookmarksHeaderView extends React.Component {
    state = {
        menu: false,
        icon: false
    }

    onContextMenuClick = (e)=>{
        e.preventDefault()
        this.setState({ menu: true })
    }

    onContextMenuClose = ()=>
        this.setState({ menu: false })

    onRenameClick = ()=>{
        const title = prompt(t.s('title'), this.props.collection.title)
        if (title)
            this.props.onRename(title)
    }

    onIconClick = ()=>
        this.setState({ icon: true })

    onIconClose = ()=>
        this.setState({ icon: false })

    render() {
        const { menu, icon } = this.state
        const { collection, onRemoveClick, onOpenAllClick } = this.props

        return (
            <>
                <a href='' className='button default' onClick={this.onContextMenuClick}>
                    <Icon name='more_horizontal' />
                </a>

                {menu ? (
                    <Contextmenu 
                        {...collection}
                        onContextMenuClose={this.onContextMenuClose}
                        onRemoveClick={onRemoveClick}
                        onOpenAllClick={onOpenAllClick}
                        onIconClick={this.onIconClick}
                        onRenameClick={this.onRenameClick}
                        to={`/space/${collection._id}`} />
                ) : null}

                {icon ? (
                    <ChangeIcon
                        _id={collection._id}
                        onClose={this.onIconClose} />
                ) : null}
            </>
        )
    }
}