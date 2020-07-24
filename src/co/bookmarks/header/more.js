import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { oneRemove } from '~data/actions/collections'
import { getSearchEmpty } from '~data/selectors/bookmarks'

import { Confirm } from '~co/overlay/dialog'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Popover, { Menu, MenuItem } from '~co/overlay/popover'

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

    onRemoveClick = async()=>{
        if (await Confirm(t.s('areYouSure'), {
            variant: 'warning',
            description: t.s('remove')+' '+this.props.collection.title,
            ok: t.s('remove')
        }))
            this.props.oneRemove(this.props.collection._id)
    }

    render() {
        const { menu } = this.state
        const { collection: { _id, access }, isSearching } = this.props

        if (isSearching || _id <=0 || access.level < 3) return null

        return (
            <>
                <Button 
                    ref={this.pin}
                    title={t.s('more')}
                    onClick={this.onContextMenuClick}>
                    <Icon name='more_horizontal' />
                </Button>

                {menu && (
                    <Popover 
                        pin={this.pin} 
                        onClose={this.onContextMenuClose}>
                        <Menu>
                            <MenuItem onClick={this.onRemoveClick}>
                                <Icon name='trash' />
                                {t.s('remove')} {t.s('collection').toLowerCase()}
                            </MenuItem>
                        </Menu>
                    </Popover>
                )}
            </>
        )
    }
}

export default connect(
	(state, { spaceId })=>({
        isSearching: !getSearchEmpty(state, spaceId)
    }),
	{ oneRemove }
)(BookmarksHeaderMore)