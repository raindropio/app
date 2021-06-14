import React from 'react'
import { PropTypes } from 'prop-types'

import { ButtonsGroup } from '~co/common/button'
import Tab from './tab'
import More from './more'

function BookmarksAdd(props) {
    return (
        <ButtonsGroup>
            <Tab {...props} />
            <More {...props} />
        </ButtonsGroup>
    )
}

BookmarksAdd.propTypes = {
    spaceId:    PropTypes.any,
    onEdit:     PropTypes.func
}

export default BookmarksAdd