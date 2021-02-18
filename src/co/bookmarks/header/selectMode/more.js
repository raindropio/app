import React from 'react'
import t from '~t'
import _ from 'lodash'
import { connect } from 'react-redux'
import * as actions from '~data/actions/bookmarks'

import Popover, { Menu, MenuItem, MenuSeparator } from '~co/overlay/popover'
import { Confirm } from '~co/overlay/dialog'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

class BookmarksSelectModeMore extends React.Component {
    static defaultProps = {
        selectMode: {}
    }

    pin = React.createRef()
    
    state = {
        menu: false
    }

    onContextMenuClick = ()=>
        this.setState({menu: true})

    onContextMenuClose = ()=>
        this.setState({menu: false})

    onImportantClick = (e)=>{
        e.preventDefault()
        this.props.importantSelected(this.props.spaceId, true)
    }

    onImportantRemoveClick = (e)=>{
        e.preventDefault()
        this.props.importantSelected(this.props.spaceId, false)
    }

    onScreenshotClick = (e)=>{
        e.preventDefault()
        this.props.screenshotSelected(this.props.spaceId)
    }

    onRemoveTagsClick = (e)=>{
        e.preventDefault()

        const title = t.s('remove')+' '+t.s('all').toLowerCase()+' '+t.s('tags').toLowerCase()

        Confirm(
            title,
            {
                description: t.s('areYouSure'),
                ok: title,
                variant: 'warning'
            }
        ).then(yes=>{
            if (yes)
                this.props.removeTagsSelected(this.props.spaceId)
        })
    }

    onReparseClick = (e)=>{
        e.preventDefault()
        this.props.reparseSelected(this.props.spaceId)
    }

    render() {
        const { selectMode: { all, ids } } = this.props

        return (
            <>
                <Button 
                    ref={this.pin} 
                    disabled={!all && !ids.length}
                    onClick={this.onContextMenuClick}>
                    {t.s('more')}…
                </Button>

                {this.state.menu ? (
                    <Popover pin={this.pin} onClose={this.onContextMenuClose}>
                        <Menu>
                            <MenuItem onClick={this.onScreenshotClick}>
                                <Icon name='web' />
                                {t.s('clickToMakeScreenshot')}
                            </MenuItem>

                            <MenuItem onClick={this.onReparseClick}>
                                <Icon name='refresh' />
                                {t.s('refresh')+' '+t.s('preview').toLowerCase()}
                            </MenuItem>

                            <MenuSeparator />

                            <MenuItem onClick={this.onImportantClick}>
                                <Icon name='like_active' />
                                {_.capitalize(t.s('to')) + ' ' + t.s('favorites').toLowerCase()}
                            </MenuItem>

                            <MenuItem onClick={this.onImportantRemoveClick}>
                                <Icon name='like' />
                                {t.s('remove')} {t.s('from')} {t.s('favorites').toLowerCase()}
                            </MenuItem>

                            <MenuSeparator />

                            <MenuItem onClick={this.onRemoveTagsClick}>
                                <Icon name='tag' />
                                {t.s('remove')} {t.s('tags').toLowerCase()}
                            </MenuItem>
                        </Menu>
                    </Popover>
                ) : null}
            </>
        )
    }
}

export default connect(
	undefined,
	actions
)(BookmarksSelectModeMore)