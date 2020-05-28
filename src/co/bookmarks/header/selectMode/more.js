import React from 'react'
import t from '~t'
import _ from 'lodash'
import Popover, { Menu, MenuItem, MenuSeparator } from '~co/overlay/popover'
import Icon from '~co/common/icon'

export default class BookmarksSelectModeMore extends React.Component {
    state = {
        menu: false
    }

    onContextMenuClick = ()=>
        this.setState({menu: true})

    onContextMenuClose = ()=>
        this.setState({menu: false})

    render() {
        const { onScreenshotClick, onImportantClick, onImportantRemoveClick, onRemoveTagsClick, onReparseClick } = this.props

        return (
            <>
                <a className='button default' onClick={this.onContextMenuClick}>
                    <Icon name='more_horizontal'/>
                </a>

                {this.state.menu && (
                    <Popover onClose={this.onContextMenuClose}>
                        <Menu>
                            <MenuItem onClick={onScreenshotClick}>
                                <Icon name='web' />
                                {t.s('clickToMakeScreenshot')}
                            </MenuItem>

                            <MenuItem onClick={onReparseClick}>
                                <Icon name='refresh' />
                                {t.s('refresh')+' '+t.s('preview').toLowerCase()}
                            </MenuItem>

                            <MenuSeparator />

                            <MenuItem onClick={onImportantClick}>
                                <Icon name='like_active' />
                                {_.capitalize(t.s('to')) + ' ' + t.s('favoriteSites').toLowerCase()}
                            </MenuItem>

                            <MenuItem onClick={onImportantRemoveClick}>
                                <Icon name='like' />
                                {t.s('remove')} {t.s('from')} {t.s('favoriteSites').toLowerCase()}
                            </MenuItem>

                            <MenuSeparator />

                            <MenuItem onClick={onRemoveTagsClick}>
                                <Icon name='tag' />
                                {t.s('remove')} {t.s('tags').toLowerCase()}
                            </MenuItem>
                        </Menu>
                    </Popover>
                )}
            </>
        )
    }
}