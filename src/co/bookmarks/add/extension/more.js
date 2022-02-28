import React from 'react'
import { PropTypes } from 'prop-types'

import { More, Menu } from '~co/overlay/popover'
import Tabs from './tabs'
import File from '../fallback/file'
import Highlights from './highlights'

function BookmarksAddMore(props) {
    return (
        <More variant='primary'>
            <Menu>
                <Tabs {...props} />
                <File {...props} />
                <Highlights {...props} />
            </Menu>
        </More>
    )
}

BookmarksAddMore.propTypes = {
    spaceId:    PropTypes.any,
    onEdit:     PropTypes.func
}

export default BookmarksAddMore