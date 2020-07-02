import React from 'react'
import t from '~t'
import getLinks from '~data/modules/bookmarks/getLinks'
import { connect } from 'react-redux'
import { oneRemove, oneUpdate } from '~data/actions/collections'

import { Confirm, Prompt } from '~co/overlay/dialog'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Contextmenu from '~co/collections/item/contextmenu'
import ChangeIcon from '~co/collections/changeIcon'

class BookmarksHeaderMore extends React.Component {
    static defaultProps = {
        spaceId: 0,
        collection: {}
    }

    pin = React.createRef()

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

    onRenameClick = async()=>{
        const title = await Prompt(t.s('title'), this.props.collection.title)
        if (title)
            this.props.oneUpdate(this.props.spaceId, { title })
    }

    onOpenAllClick = (e)=>{
        e.preventDefault()
        getLinks(this.props.spaceId).forEach(link => window.open(link))
    }

    onRemoveClick = async()=>{
        if (await Confirm(t.s('areYouSure')))
            this.props.oneRemove(this.props.collection._id)
    }

    onIconClick = ()=>
        this.setState({ icon: true })

    onIconClose = ()=>
        this.setState({ icon: false })

    render() {
        const { menu, icon } = this.state
        const { collection } = this.props

        return (
            <>
                <Button 
                    ref={this.pin}
                    onClick={this.onContextMenuClick}>
                    <Icon name='more_horizontal' />
                </Button>

                {menu ? (
                    <Contextmenu 
                        {...collection}
                        pin={this.pin}
                        onContextMenuClose={this.onContextMenuClose}
                        onRemoveClick={this.onRemoveClick}
                        onOpenAllClick={this.onOpenAllClick}
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

export default connect(
	undefined,
	{ oneRemove, oneUpdate }
)(BookmarksHeaderMore)