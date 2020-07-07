import React from 'react'
import t from '~t'
import getLinks from '~data/modules/bookmarks/getLinks'
import { connect } from 'react-redux'
import { oneRemove, oneUpdate } from '~data/actions/collections'
import { getSearchEmpty } from '~data/selectors/bookmarks'

import { Confirm, Prompt } from '~co/overlay/dialog'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Contextmenu from '~co/collections/item/contextmenu'

class BookmarksHeaderMore extends React.Component {
    static defaultProps = {
        spaceId: 0,
        collection: {}
    }

    pin = React.createRef()

    state = {
        menu: false
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
        if (await Confirm(t.s('areYouSure', { variant: 'warning' })))
            this.props.oneRemove(this.props.collection._id)
    }

    render() {
        const { menu } = this.state
        const { collection, isSearching } = this.props

        if (isSearching) return null

        return (
            <>
                <Button 
                    ref={this.pin}
                    title={t.s('more')}
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
                        onRenameClick={this.onRenameClick}
                        to={`/space/${collection._id}`} />
                ) : null}
            </>
        )
    }
}

export default connect(
	(state, { spaceId })=>({
        isSearching: !getSearchEmpty(state, spaceId)
    }),
	{ oneRemove, oneUpdate }
)(BookmarksHeaderMore)