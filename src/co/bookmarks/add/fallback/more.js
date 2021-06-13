import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem } from '~co/overlay/popover'
import Icon from '~co/common/icon'

export default function BookmarksAddFallbackMore({ onFile, pin, onClose }) {
    return (
        <Popover
            pin={pin}
            mouseLeave
            onClose={onClose}>
            <Menu>
                <MenuItem autoFocus onMouseDown={onFile}>
                    <Icon name='upload' />
                    {t.s('upload')} {t.s('file').toLowerCase()}…
                </MenuItem>
            </Menu>
        </Popover>
    )
}