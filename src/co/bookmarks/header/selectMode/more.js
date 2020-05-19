import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem } from '~co/popover'
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
        const { onScreenshotClick, onImportantRemoveClick, onRemoveTagsClick, onReparseClick } = this.props

        return (
            <>
                <a className='button active' onClick={this.onContextMenuClick}>
                    {t.s('more')}<Icon name='arrow'/>
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

                            <MenuItem onClick={onImportantRemoveClick}>
                                <Icon name='like' />
                                {t.s('remove')} {t.s('from')} {t.s('favoriteSites').toLowerCase()}
                            </MenuItem>

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